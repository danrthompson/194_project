class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      t.string :name
      t.int :parent_id
      t.int :user_id

      t.timestamps
    end
  end
end
