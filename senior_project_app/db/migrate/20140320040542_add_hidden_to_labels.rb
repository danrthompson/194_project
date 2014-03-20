class AddHiddenToLabels < ActiveRecord::Migration
  def change
  	add_column :labels, :hidden, :boolean
  end
end
