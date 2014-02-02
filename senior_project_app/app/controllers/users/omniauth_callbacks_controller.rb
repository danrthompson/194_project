require 'awesome_print'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def google_oauth2
		auth_hash = request.env["omniauth.auth"]
		@user = User.where(provider: auth_hash['provider'], uid: auth_hash['uid']).first

		ap auth_hash

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

		# #What data comes back from OmniAuth?     
		# @auth = request.env["omniauth.auth"]
		# #Use the token from the data to request a list of calendars
		# @token = @auth['credentials']['token']
		# @email = @auth['info']['email']
		# @name = @auth['info']['first_name']
		# # render text: ap(@auth) and return
		# # render text: @token and return
		# # client = Google::APIClient.new
		# # client.authorization.access_token = @token
		# # service = client.discovered_api('calendar', 'v3')
		# # @result = client.execute(
		# #   :api_method => service.calendar_list.list,
		# #   :parameters => {},
		# #   :headers => {'Content-Type' => 'application/json'})
		# gmail = Gmail.connect(:xoauth, @email, token: @token)
		# @count = gmail.inbox.count
		# render text: @count and return

	end
end