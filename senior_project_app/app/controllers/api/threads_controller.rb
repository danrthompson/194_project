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

	def order
		current_user_id = current_user.id
		thread_info_array = JSON.parse(params['data'])
		thread_info_array.each do |thread_info|
			thread = Conversation.find(thread_info['uid'])
			if thread.user_id != current_user_id then
				head :unauthorized and return
			end
			thread.order_value = thread_info['order']
			thread.save
		end
		head :ok
	end
end