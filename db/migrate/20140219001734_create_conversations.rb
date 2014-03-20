class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
    	t.string :thread_id
    	t.datetime :most_recent_date
    	t.references :user

      t.timestamps
    end

    add_column :emails, :conversation_id, :integer
  end
end
