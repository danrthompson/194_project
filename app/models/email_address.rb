class EmailAddress < ActiveRecord::Base
  attr_accessible :email_address, :name, :from_address, :to_address, :cc_address, :bcc_address, :email_id

  belongs_to :email

  validates :email_address, presence: true

  def self.from_addresses_to_string(email_id)
  	form_string_from_addresses(email_id: email_id, from_address: true)
  end

  def self.to_addresses_to_string(email_id)
  	form_string_from_addresses(email_id: email_id, to_address: true)
  end

  def self.cc_addresses_to_string(email_id)
  	form_string_from_addresses(email_id: email_id, cc_address: true)
  end

  def self.bcc_addresses_to_string(email_id)
  	form_string_from_addresses(email_id: email_id, bcc_address: true)
  end

  private

	def self.form_string_from_addresses(opt_hash)
		str = ''
		self.where(opt_hash).each do |addr|
			if addr.name then	
				str += "#{addr.name} "
			end
			str += "<#{addr.email_address}>, "
		end
		str = str[0..-3]
	end
end
