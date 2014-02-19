class AddPrimaryAttrToLabels < ActiveRecord::Migration
  def change
  	add_column :emails_labels, :primary, :boolean
  end
end
