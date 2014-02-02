require 'awesome_print'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def google_oauth2
		auth_hash = request.env["omniauth.auth"]
		@user = User.where(provider: auth_hash['provider'], uid: auth_hash['uid']).first

		if @user
			sign_in_and_redirect @user, :event => :authentication
		else
			@user = User.create_from_google_oauth2(auth_hash)
			if @user.valid? then
				sign_in_and_redirect @user, :event => :authentication
			else
				render text: @user.errors.full_messages.join(', ')
			end
		end			

	end
end