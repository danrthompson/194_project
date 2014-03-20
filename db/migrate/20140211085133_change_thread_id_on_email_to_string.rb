class ChangeThreadIdOnEmailToString < ActiveRecord::Migration
  def up
  	remove_column :emails, :thread_id
  	add_column :emails, :thread_id, :string
  end

  def down
  	remove_column :emails, :thread_id
  	add_column :emails, :thread_id, :integer
  end
end
