class AddScheduledPullToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :last_pull_scheduled, :datetime
  end
end
