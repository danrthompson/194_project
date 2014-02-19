class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :read, :sent, :subject, :text_body, :thread_id, :uid, :user_id

  has_many :email_addresses
  belongs_to :user
  has_many :emails_labels
  has_many :labels, through: :emails_labels
  belongs_to :conversation

  def determine_primary_label_first_time
  	labels = self.labels.order(:name)
  	labels.each do |label|
  		if label.can_be_primary? then
        email_label_join_record = EmailsLabel.where(email_id: self.id, label_id: label.id).first
  			email_label_join_record.primary = true
  			email_label_join_record.save
  			break
  		end
  	end
  end
end
