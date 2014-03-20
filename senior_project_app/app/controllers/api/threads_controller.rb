class Api::ThreadsController < ApplicationController
	before_filter :authenticate_user!

	def create
		if params[:to].blank? or params[:subject].blank? then
			head :bad_request and return
		end
		gmail = current_user.get_gmail_connection

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

		head :ok
	end

	def show
		thread = Conversation.find(params[:id])
		if thread.user_id != current_user.id then
			head :unauthorized and return
		end

		render text: (thread.to_hash_with_emails).to_json
	end

	def update
		thread = Conversation.find(params[:id])

		if thread.user_id != current_user.id then
			head :unauthorized and return
		end

		if not params['label_id'].nil? then
			new_label = Label.find(params['label_id'])

			if new_label.user_id != current_user.id then
				head :unauthorized and return
			end

			thread.label = new_label

			# gmail = current_user.get_gmail_connection
			# thread.relabel new_label, gmail
		end

		if not params['order'].nil? then
			thread.order_value = params['order']
		end

		if not params['read'].nil? then
			thread.update_read_status(!!params['read'])
		end

		thread.save!

		head :ok
	end

	def destroy
		thread = Conversation.find(params[:id])
		if thread.user_id != current_user.id then
			head :unauthorized and return
		end
		gmail = current_user.get_gmail_connection

		thread.archive gmail

		head :ok
	end
end