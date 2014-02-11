class EmailAddress < ActiveRecord::Base
  attr_accessible :email, :name, :from_address, :to_address, :cc_address, :bcc_address

  belongs_to :email
end
