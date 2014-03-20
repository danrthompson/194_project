class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.datetime :date
      t.string :subject
      t.text :html_body
      t.text :text_body
      t.boolean :read
      t.boolean :sent
      t.integer :uid
      t.integer :thread_id

      t.timestamps
    end
  end
end
