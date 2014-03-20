class MakeConversationsHoldReadStatus < ActiveRecord::Migration
  def up
  	remove_column :emails, :read
  	add_column :conversations, :read, :boolean
  end

  def down
  	remove_column :conversations, :read
  	add_column :emails, :read, :boolean
  end
end
