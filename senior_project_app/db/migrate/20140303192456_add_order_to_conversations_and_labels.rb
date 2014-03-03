class AddOrderToConversationsAndLabels < ActiveRecord::Migration
  def change
  	add_column :conversations, :order_value, :integer
  	add_column :labels, :order_value, :integer
  end
end
