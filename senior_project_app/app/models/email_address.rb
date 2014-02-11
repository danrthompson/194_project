class EmailAddress < ActiveRecord::Base
  attr_accessible :email_address, :name, :from_address, :to_address, :cc_address, :bcc_address, :email_id

  belongs_to :email

  validates :email_address, presence: true
end
