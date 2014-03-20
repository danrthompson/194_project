class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :sent, :subject, :text_body, :thread_id, :uid, :user_id, :gmsg_id

  has_many :email_addresses
  belongs_to :user
  has_many :emails_labels
  has_many :labels, through: :emails_labels
  belongs_to :conversation

  def self.email_array_to_json(emails)
    return (emails.map! {|email| email.to_hash})
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

  def self.email_addresses_to_hash(email_addresses)
    addrs = []
    email_addresses.each do |addr|
      if addr.from_address
        type = "from"
      end

      if addr.to_address
        type = "to"
      end

      if addr.cc_address
        type = "cc"
      end

      if addr.bcc_address
        type = "bcc"
      end

      hash = {
        name: addr.name,
        address: addr.email_address,
        type: type
      }
      addrs << hash
    end
    return addrs
  end

  def to_hash
    # from_addrs = Email.email_addresses_to_string(self.email_addresses.where(from_address: true))
    # to_addrs   = Email.email_addresses_to_string(self.email_addresses.where(to_address: true))
    # cc_addrs   = Email.email_addresses_to_string(self.email_addresses.where(cc_address: true))
    # bcc_addrs  = Email.email_addresses_to_string(self.email_addresses.where(bcc_address: true))

    return {
      id:              self.id,
      thread_id:       self.conversation_id,
      date:            self.date.to_i * 1000,
      subject:         self.subject,
      has_html:        !self.html_body.nil?,
      text_body:       self.text_body,
      email_addresses: Email.email_addresses_to_hash(self.email_addresses)
    }
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

  def archive(gmail)
    gmail_email = User.get_all_mail_mailbox(gmail).emails(msg_id: self.gmsg_id).first
    self.labels.all.each do |label|
      if label.removed_on_archive? then
        label.emails_labels.where(email_id: self.id).destroy_all
        gmail_email.gmail_unflag(Label.gem_name(label.name))
      end
    end
  end

  def update_read_gmail(read_status, gmail)
    gmail_email = User.get_all_mail_mailbox(gmail).emails(msg_id: self.gmsg_id).first
    if read_status then
      gmail_email.read!
    else
      gmail_email.unread!
    end
  end

end
