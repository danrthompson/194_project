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
		# connect_to_gmail(current_user)
		# @subject = Mail.first.subject
		current_user.update_folders
		@emails = Mail.find(:what => :first, :count => 10, :order => :asc)
		# gmail = Gmail.connect(:xoauth, current_user.email, token: current_user.auth_token)
		# @count = gmail.inbox.count
	end

	# def connect_to_gmail(current_user)
	# 	Mail.defaults do
	# 		retriever_method :imap, address: 'imap.gmail.com',
	# 		port: 993, user_name: current_user.email, password: current_user.auth_token, enable_ssl: true,
	# 		authentication: 'XOAUTH2'
	# 	end
	# end

end