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
			# pull email since last pull
		else
			# first time pulling email
		end
	end

end
