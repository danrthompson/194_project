class Api::LabelsController < ApplicationController
	before_filter :authenticate_user!
	def index
		render text: Label.label_array_to_json(current_user.get_primary_labels)
	end
	def create

	end
	# def update
	# 	# one for batch update and one for updating one
	# 	render text: 'test'
	# end
	def show

	end
	def destroy

	end

	def order
		labels = params[:data]
	end
end