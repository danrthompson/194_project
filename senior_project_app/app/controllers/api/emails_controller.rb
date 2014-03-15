class Api::EmailsController < ApplicationController
	before_filter :authenticate_user!

	def create

	end

	def show
		emails = Email.find params[:id].split(',')
		emails.each do |email|
			if email.user_id != current_user.id then
				head :unauthorized and return
			end
		end

		render text: Email.email_array_to_json(emails).to_json
	end

	def html
		email = Email.find params[:id]

		render text: email.html_body
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

		thread.archive

		head :ok
	end
end