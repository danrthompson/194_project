class Conversation < ActiveRecord::Base
  attr_accessible :thread_id, :most_recent_date, :user_id, :archived, :read
  has_many :emails
  belongs_to :user
  belongs_to :label

	def self.add_email_to_conversation(email, email_read=false)
		conversation = self.where(user_id: email.user_id, thread_id: email.thread_id).first
		if not conversation then
			conversation = self.create(user_id: email.user_id, thread_id: email.thread_id, most_recent_date: email.date, archived: false, read: email_read)
		end
		conversation.emails << email
		if not conversation.most_recent_date or email.date > conversation.most_recent_date then
			conversation.most_recent_date = email.date
		end
		if not conversation.label then
			conversation.label = email.get_primary_label
		end
		if not conversation.read and email_read then
			conversation.read = email_read
		end
		conversation.save
	end

	def self.conversation_array_to_json(conversations)
		return (conversations.map! {|conversation| conversation.to_hash}).to_json
	end

	def to_hash
		emails = self.emails.order(:date)
		from_addrs = []
		email_ids = []
		emails.each do |email|
			email.email_addresses.where(from_address: true).each do |from_addr|
				# if from_addr.name then
				# 	if not from_addr.name.in? from_addrs then
				# 		from_addrs << from_addr.name
				# 	end
				# else
				# 	if not from_addr.email_address.in? from_addrs then
				# 		from_addrs << from_addr.email_address
				# 	end
				# end
				from_addrs << {id: from_addr.id, address: from_addr.email_address, type: :from, name: from_addr.name}
			end

			email_ids << email.id
		end

		# from_addrs = from_addrs.join(', ')
		return {
			id:              self.id,
			subject:         emails.first.subject,
			order:           self.get_order(),
			email_ids:       email_ids,
			latest_date:     self.most_recent_date.to_i*1000,
			email_addresses: from_addrs,
			archived:        self.archived,
			read:            self.read
		}
	end

	def get_order
		if not self.order_value.nil?
			return self.order_value
		else
			return self.most_recent_date.to_i*1000
		end
	end

	def to_hash_with_emails
		{
			id:       self.id,
			label_id: self.label_id,
			order:    self.get_order(),
			emails:   Email.email_array_to_json(self.emails.order(:date)),
			archived: self.archived,
			read:     self.read
		}
	end

	def archive(gmail)
		self.emails.all.each do |email|
			email.archive gmail
		end
		self.archived = true
		self.save!
	end

	def relabel(new_label, gmail)
		old_label = self.label
		self.emails.each do |email|
			gmail_email = nil
			if not new_label.in? email.labels then
				email.labels << new_label
				gmail_email = User.get_all_mail_mailbox(gmail).emails(msg_id: email.gmsg_id).first
				gmail_email.label new_label.name
			end
			if old_label.in? email.labels then
				email.labels.destroy old_label
				if not gmail_email then
					gmail_email = User.get_all_mail_mailbox(gmail).emails(msg_id: email.gmsg_id).first
				end
				gmail_email.gmail_unflag(Label.gem_name(old_label.name))
			end
		end
		self.label = new_label
		self.save!
	end

	def update_read_status(read_status)
		gmail = self.user.get_gmail_connection
		self.emails.each do |email|
			email.update_read_gmail read_status, gmail
		end
		self.read = read_status
		self.save!
	end

end
