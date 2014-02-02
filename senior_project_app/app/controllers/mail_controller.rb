class MailController < ApplicationController
	before_filter :authenticate_user!

	def index
		# client = Google::APIClient.new
		# client.authorization.access_token = @token
		# service = client.discovered_api('calendar', 'v3')
		# @result = client.execute(
		#   :api_method => service.calendar_list.list,
		#   :parameters => {},
		#   :headers => {'Content-Type' => 'application/json'})
		# render text: current_user.refresh_token and return
		current_user.refresh_token_if_necessary
		gmail = Gmail.connect(:xoauth, current_user.email, token: current_user.auth_token)
		@count = gmail.inbox.count
		render text: @count and return
	end

end