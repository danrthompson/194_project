class Api::ThreadsController < ApplicationController
	before_filter :authenticate_user!

	def create

	end

	def show
		thread = Conversation.find(params[:id])
		if thread.user_id != current_user.id then
			head :unauthorized and return
		end

		render text: (thread.to_hash_with_emails).to_json
	end

	def reply

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