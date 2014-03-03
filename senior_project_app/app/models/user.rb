class User < ActiveRecord::Base
	# Include default devise modules. Others available are:
	# :token_authenticatable, :confirmable,
	# :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
				 :recoverable, :rememberable, :trackable,
				 :validatable
	devise :omniauthable, :omniauth_providers => [:google_oauth2]

	attr_accessible :email, :password, :password_confirmation,
		:remember_me, :provider, :uid, :auth_token,
		:auth_token_expiration, :refresh_token, :first_name,
		:last_name, :gender

	validates :provider, :uid, :auth_token, :refresh_token,
		:auth_token_expiration, presence: true
	validates :uid, :email, uniqueness: true

	has_many :emails
	has_many :labels
	has_many :conversations

	def self.refresh_emails_for_all_users
		puts "Task running: refresh_emails_for_all_users."
		puts "Time: #{Time.now.localtime}"
		self.all.each do |user|
			puts "Running task on user #{user.id}."
			user.refresh_token_if_necessary
			gmail = Gmail.connect!(:xoauth, user.email, token: user.auth_token)
			user.pull_email_if_necessary(gmail)
			puts "Done with user #{user.id}."
		end
		puts "Task complete.\n----------------"
	end

	def self.create_from_google_oauth2(auth_hash)
		User.create(
			provider: auth_hash['provider'],
			uid: auth_hash['uid'],
			email: auth_hash['info']['email'],
			auth_token: auth_hash['credentials']['token'],
			refresh_token: auth_hash['credentials']['refresh_token'],
			auth_token_expiration: Time.at(auth_hash['credentials']['expires_at'].to_i),
			first_name: auth_hash['info']['first_name'],
			last_name: auth_hash['info']['last_name'],
			gender: auth_hash['extra']['raw_info']['gender'],
			password: Devise.friendly_token[0,20]
		)
	end

	def get_primary_labels
		Label.joins(:conversations).where('conversations.user_id' => self.id).uniq.order(:order_value)
	end

	def refresh_token_if_necessary
		if self.auth_token_expiration - 100 < Time.now then
			data = {
				:client_id => Devise.omniauth_configs[:google_oauth2].strategy.client_id,
				:client_secret => Devise.omniauth_configs[:google_oauth2].strategy.client_secret,
				:refresh_token => self.refresh_token,
				:grant_type => "refresh_token"
			}
			response = ActiveSupport::JSON.decode(RestClient.post "https://accounts.google.com/o/oauth2/token", data)
			if response["access_token"].present? and response["expires_in"].present? then
				self.auth_token = response["access_token"]
				self.auth_token_expiration = Time.now + response["expires_in"]
				save!
			else
				raise 'No token returned'
			end
		end
	end

	def pull_email_if_necessary(gmail)
		if self.time_last_pull then
			if Time.now - self.time_last_pull < 7200 then
				return
			end
			# pull email since last pull
			recent_emails = gmail.mailbox('[Gmail]/All Mail').emails(after: self.time_last_pull)
		else
			# first time pulling email
			recent_emails = gmail.mailbox('[Gmail]/All Mail').emails(after: 1.month.ago)
		end
		if recent_emails.length > 150 then
			recent_emails = recent_emails[-150,150]
		end
		recent_emails.each do |email|
			if Email.where(user_id: self.id, uid: email.uid).count != 0 then
				next
			end
			puts "New email. Subject: #{email.subject}. UID: #{email.uid}"
			new_email = Email.new(user_id: self.id, subject: email.subject, uid: email.uid, date: Time.parse(email.date), thread_id: email.thread_id.to_s)
			if email.html_part then
				new_email.html_body = email.html_part.decode_body.encode('UTF-8', :invalid => :replace, :undef => :replace)
			end
			if email.text_part then
				new_email.text_body = email.text_part.decode_body.encode('UTF-8', :invalid => :replace, :undef => :replace)
			end
			new_email.save
			email.from.each do |from_addr|
				EmailAddress.create(name: from_addr.name, email_address: "#{from_addr.mailbox}@#{from_addr.host}", from_address: true, email_id: new_email.id)
			end
			if email.to then
				email.to.each do |to_addr|
					EmailAddress.create(name: to_addr.name, email_address: "#{to_addr.mailbox}@#{to_addr.host}", to_address: true, email_id: new_email.id)
				end
			end
			if email.cc then
				email.cc.each do |cc_addr|
					EmailAddress.create(name: cc_addr.name, email_address: "#{cc_addr.mailbox}@#{cc_addr.host}", cc_address: true, email_id: new_email.id)
				end
			end
			if email.bcc then
				email.bcc.each do |bcc_addr|
					EmailAddress.create(name: bcc_addr.name, email_address: "#{bcc_addr.mailbox}@#{bcc_addr.host}", bcc_address: true, email_id: new_email.id)
				end
			end
			labels = email.labels
			if labels and labels.length > 0 then
				labels.each do |label_name|
					label = Label.where(user_id: self.id, name: label_name).first
					if not label then
						label = Label.create(user_id: self.id, name: label_name)
					end
					label.emails << new_email
				end
			end
			Conversation.add_email_to_conversation(new_email)
		end
		self.time_last_pull = Time.now
		save!
	end

end
