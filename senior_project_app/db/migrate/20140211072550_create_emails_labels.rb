class CreateEmailsLabels < ActiveRecord::Migration
  def change
    create_table :emails_labels do |t|
    	t.belongs_to :email
    	t.belongs_to :label
    end
  end
end
