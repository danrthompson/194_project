class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :read, :sent, :subject, :text_body, :thread_id, :uid, :user_id, :gmsg_id

  has_many :email_addresses
  belongs_to :user
  has_many :emails_labels
  has_many :labels, through: :emails_labels
  belongs_to :conversation

  def self.email_array_to_json(emails)
    return (emails.map! {|email| email.to_hash}).to_json
  end

  def self.email_addresses_to_string(email_addresses)
    addrs = []
    email_addresses.each do |addr|
      addr_array = []
      if addr.name then
        addr_array << addr.name
      end
      addr_array << "<#{addr.email_address}>"
      addrs << addr_array.join(' ')
    end
    return addrs.join(', ')
  end

  def to_hash
    from_addrs = Email.email_addresses_to_string(self.email_addresses.where(from_address: true))
    to_addrs = Email.email_addresses_to_string(self.email_addresses.where(to_address: true))
    cc_addrs = Email.email_addresses_to_string(self.email_addresses.where(cc_address: true))
    bcc_addrs = Email.email_addresses_to_string(self.email_addresses.where(bcc_address: true))

    return {id: self.id, date: self.date, subject: self.subject, html_body: self.html_body, text_body: self.text_body, from_addresses: from_addrs, to_addresses: to_addrs, cc_addresses: cc_addrs, bcc_addresses: bcc_addrs}
  end

  def get_primary_label
  	labels = self.labels.order(:name)
  	labels.each do |label|
  		if label.can_be_primary? then
        return label
  		end
  	end
    return nil
  end

  def archive
    self.labels.all.each do |label|
      if label.removed_on_archive? then
        label.emails_labels.where(email_id: email.id).first.destroy
      end
    end
  end

end
