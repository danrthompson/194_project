class AddGMsgIdToEmails < ActiveRecord::Migration
  def change
  	add_column :emails, :gmsg_id, :string
  end
end
