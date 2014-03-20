class ConversationOrderToBigInt < ActiveRecord::Migration
	def change
		change_column :conversations, :order_value, :bigint
	end
end
