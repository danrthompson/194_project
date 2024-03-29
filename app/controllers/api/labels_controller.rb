class Api::LabelsController < ApplicationController
	before_filter :authenticate_user!

	def index
		hidden = if params['hidden'].nil? then false else params['hidden'] end
		render text: Label.label_array_to_json(current_user.labels.where(hidden: hidden).order(:order_value))
	end

	def create
		if params['title'].blank? then
			head :bad_request and return
		end

		gmail = current_user.get_gmail_connection

		gmail.labels.new params['title']

		label = Label.new(hidden: false, name: params['title'], order_value: params['order'])
		label.user = current_user

		label.save!

		head :ok
	end
	
	def update
		label = Label.find(params[:id])
		if label.user_id != current_user.id then
			head :unauthorized and return
		end

		if not params['title'].nil? then
			label.name = params['title']
		end
		
		if not params['order'].nil? then
			label.order_value = params['order']
		end

		if not params['hidden'].nil? then
			label.hidden = params['hidden']
		end

		label.save!

		head :ok
	end
	
	def show
		label = Label.find(params[:id])
		if label.user_id != current_user.id then
			head :unauthorized and return
		end
		render text: (label.to_hash).to_json
	end

	def order
		current_user_id = current_user.id
		label_info_array = JSON.parse(params['data'])
		label_info_array.each do |label_info|
			label = Label.find(label_info['uid'])
			if label.user_id != current_user_id then
				head :unauthorized and return
			end
			label.order_value = label_info['order']
			label.save
		end
		head :ok
	end
end