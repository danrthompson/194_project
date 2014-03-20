class AddOldLabelToConversations < ActiveRecord::Migration
  def change
  	add_column :conversations, :archived, :boolean
  end
end
