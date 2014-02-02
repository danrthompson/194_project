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

end
