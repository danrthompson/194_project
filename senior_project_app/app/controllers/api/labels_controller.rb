class Api::LabelsController < ApplicationController
	# before_filter :authenticate_user!
	def index
		render text: Label.label_array_to_json(current_user.get_primary_labels)
	end

	def create
		data = JSON.parse(params[:data])

		label = Label.new
		label.user = current_user
		label.name = data['title']
		label.order_value = data['order']

		label.save!

		head :ok
	end
	
	def update
		label = Label.find(params[:id])
		if label.user_id != current_user.id then
			head :unauthorized and return
		end

		data = JSON.parse(params[:data])

		if not data['title'].nil? then
			label.name = data['title']
		end
		if not data['order'].nil? then
			label.order_value = data['order']
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
	
	def destroy
		label = Label.find(params[:id])
		if label.user_id != current_user.id then
			head :unauthorized and return
		end

		label.destroy

		head :ok
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