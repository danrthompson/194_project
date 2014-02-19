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
		render text: Conversation.conversation_array_to_json(label.conversations)
	end
end