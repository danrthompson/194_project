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
		current_user.pull_email_if_necessary(gmail)
		@labels = Label.where(user_id: current_user.id)
		# @subject = Mail.first.subject
		# @emails = gmail.inbox.emails[0,5]
		# @count = gmail.inbox.count
	end

	def compose_email

	end

	def compose_email_post
		# render text: params and return
		gmail = current_user.get_gmail_connection
		if not params[:draft] or params[:draft][:to].blank? or params[:draft][:subject].blank? then
			render text: 'Form improperly submitted.' and return
		end
		to_data = params[:draft][:to]
		subject_data = params[:draft][:subject]
		body_data = params[:draft][:body]
		cc_data = (!params[:draft][:cc].blank?) ? params[:draft][:cc] : nil
		bcc_data = (!params[:draft][:bcc].blank?) ? params[:draft][:bcc] : nil
		gmail.deliver! do
			to to_data
			subject subject_data
			text_part do
				body body_data
			end
			if cc_data then
				cc cc_data
			end
			if bcc_data then
				bcc bcc_data
			end
		end
		# if not params[:draft][:cc].blank?
		# 	cc params[:draft][:cc]
		# end
		# if not params[:draft][:bcc].blank?
		# 	bcc params[:draft][:bcc]
		# end
		redirect_to '/'
	end

	def label
		@label = Label.find_by_id(params[:label_id])
		if @label and current_user.id == @label.user_id then
			@emails = @label.emails.order(:date).reverse_order
		else
			render text: 'Label does not exist or you are unauthorized to view it.' and return
		end
	end

	def email
		@email = Email.find_by_id(params[:email_id])
		if not @email or current_user.id != @email.user_id then
			render text: 'Email does not exist or you are unauthorized to view it.' and return
		end
	end

	def manage_email_labels
		@email = Email.find_by_id(params[:email_id])
		if not @email or current_user.id != @email.user_id then
			render text: 'Email does not exist or you are unauthorized to view it.' and return
		end
		@email_label_ids = []
		@email.labels.each do |label|
			@email_label_ids << label.id
		end
		@user_labels = current_user.labels
	end

	def manage_email_labels_post
		@email = Email.find_by_id(params[:email_id])
		if not @email or current_user.id != @email.user_id then
			render text: 'Email does not exist or you are unauthorized to view it.' and return
		end
		chosen_labels = []
		if params[:labels] then
			params[:labels].keys.each do |label_id|
				if params[:labels][label_id] == '1'
					chosen_labels << label_id.to_i
				end
			end
		end
		@email.labels.each do |label|
			if not label.id.in? chosen_labels then
				@email.labels.destroy(label)
			else
				chosen_labels.delete(label.id)
			end
		end
		chosen_labels.each do |label_id|
			label = Label.find_by_id(label_id)
			if not label or current_user.id != label.user_id then
				render text: 'Label does not exist or you are unauthorized to view it.' and return
			end
			@email.labels << label
		end
		redirect_to action: :manage_email_labels and return
	end


end