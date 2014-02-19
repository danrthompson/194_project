class ApiController < ApplicationController
	def get_labels
		user = User.find_by_id(params[:user_id])
		if not user then
			render text: 'Error, user doesn\'t exist.' and return
		end
		render text: Label.label_array_to_json(user.get_primary_labels)
	end

	def get_threads
		label = Label.find_by_id(params[:label_id])
		if not label then
			render text: 'Error, label doesn\'t exist.' and return
		end
		render text: Conversation.conversation_array_to_json(label.conversations.order(:most_recent_date).reverse_order)
	end

	def get_emails
		conversation = Conversation.find_by_id(params[:conversation_id])
		if not conversation then
			render text: 'Error, conversation doesn\'t exist.' and return
		end
		render text: Email.email_array_to_json(conversation.emails.order(:date).reverse_order)
	end

	def send_email
		user = User.find_by_id(params[:user_id])
		if not user then
			render text: 'Error, user doesn\'t exist.' and return
		end
		if params[:to].blank? or params[:subject].blank? then
			render text: 'To field and subject field required.' and return
		end
		user.refresh_token_if_necessary
		gmail = connect_to_gmail(user)

		to_data = params[:to]
		subject_data = params[:subject]
		body_data = params[:body]
		cc_data = (!params[:cc].blank?) ? params[:cc] : nil
		bcc_data = (!params[:bcc].blank?) ? params[:bcc] : nil
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

		render text: 'Email sent.'
	end

	def reply_to_email
		email = Email.find_by_id(params[:email_id])
		if not email then
			render text: 'Error, email doesn\'t exist.' and return
		end
		user = email.user
		user.refresh_token_if_necessary
		gmail = connect_to_gmail(user)
		
		original_email = gmail.mailbox('[Gmail]/All Mail').find(:all, {query: ['UID', email.uid]}).first
		reply = original_email.reply


	end

	def connect_to_gmail(user)
		Gmail.connect!(:xoauth, user.email, token: user.auth_token)
	end
end