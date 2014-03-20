class AddTimeLastPullToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :time_last_pull, :datetime
  end
end
