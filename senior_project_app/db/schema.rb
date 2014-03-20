# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140320095229) do

  create_table "conversations", :force => true do |t|
    t.string   "thread_id"
    t.datetime "most_recent_date"
    t.integer  "user_id"
    t.datetime "created_at",                    :null => false
    t.datetime "updated_at",                    :null => false
    t.integer  "label_id"
    t.integer  "order_value",      :limit => 8
    t.boolean  "archived"
    t.boolean  "read"
  end

  create_table "delayed_jobs", :force => true do |t|
    t.integer  "priority",   :default => 0, :null => false
    t.integer  "attempts",   :default => 0, :null => false
    t.text     "handler",                   :null => false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  add_index "delayed_jobs", ["priority", "run_at"], :name => "delayed_jobs_priority"

  create_table "email_addresses", :force => true do |t|
    t.string   "name"
    t.string   "email_address", :null => false
    t.boolean  "from_address"
    t.boolean  "to_address"
    t.boolean  "cc_address"
    t.boolean  "bcc_address"
    t.integer  "email_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "emails", :force => true do |t|
    t.datetime "date"
    t.string   "subject"
    t.text     "html_body"
    t.text     "text_body"
    t.boolean  "sent"
    t.integer  "uid"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "user_id"
    t.string   "thread_id"
    t.integer  "conversation_id"
    t.string   "gmsg_id"
  end

  add_index "emails", ["user_id"], :name => "index_emails_on_user_id"

  create_table "emails_labels", :force => true do |t|
    t.integer "email_id"
    t.integer "label_id"
  end

  create_table "labels", :force => true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.integer  "order_value"
    t.boolean  "hidden"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "provider"
    t.string   "uid"
    t.string   "auth_token"
    t.datetime "auth_token_expiration"
    t.string   "refresh_token"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "gender"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.datetime "time_last_pull"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
