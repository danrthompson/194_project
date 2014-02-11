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
		gmail = connect_to_gmail(current_user)
		current_user.pull_email_if_necessary(gmail)
		@labels = Label.where(user_id: current_user.id)
		# @subject = Mail.first.subject
		# @emails = gmail.inbox.emails[0,5]
		# gmail = Gmail.connect(:xoauth, current_user.email, token: current_user.auth_token)
		# @count = gmail.inbox.count
	end

	def compose_email

	end

	def compose_email_post
		render text: params and return
	end

	def connect_to_gmail(user)
		Gmail.connect!(:xoauth, user.email, token: user.auth_token)
	end

	def label
		@label = Label.find_by_id(params[:label_id])
		if @label and current_user.id == @label.user_id then
			@emails = @label.emails
		else
			render text: 'Label does not exist or you are unauthorized to view it.' and return
		end
	end


end