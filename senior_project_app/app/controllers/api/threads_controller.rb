class Api::ThreadsController < ApplicationController
	before_filter :authenticate_user!

	def create

	end

	def show

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