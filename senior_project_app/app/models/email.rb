class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :read, :sent, :subject, :text_body, :thread_id, :uid

  has_many :email_addresses
  belongs_to :user
  has_and_belongs_to_many :labels
end
