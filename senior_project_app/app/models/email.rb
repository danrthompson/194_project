class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :read, :sent, :subject, :text_body, :thread_id, :uid, :user_id

  has_many :email_addresses
  belongs_to :user
  has_many :emails_labels
  has_many :labels, through: :emails_labels
  belongs_to :conversation

  def get_primary_label
  	labels = self.labels.order(:name)
  	labels.each do |label|
  		if label.can_be_primary? then
        return label
  		end
  	end
    return nil
  end
end
