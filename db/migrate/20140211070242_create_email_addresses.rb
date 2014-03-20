class CreateEmailAddresses < ActiveRecord::Migration
  def change
    create_table :email_addresses do |t|
      t.string :name
      t.string :email_address, null: false
      t.boolean :from_address
      t.boolean :to_address
      t.boolean :cc_address
      t.boolean :bcc_address      
      t.references :email

      t.timestamps
    end
  end
end
