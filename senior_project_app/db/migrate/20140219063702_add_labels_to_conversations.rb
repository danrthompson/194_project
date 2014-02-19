class AddLabelsToConversations < ActiveRecord::Migration
  def change
  	add_column :conversations, :label_id, :integer
  end
end
