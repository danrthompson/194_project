class Conversation < ActiveRecord::Base
  attr_accessible :thread_id, :most_recent_date, :user_id
  has_many :emails
  belongs_to :user

	def self.add_email_to_conversation(email)
		conversation = self.where(user_id: email.user_id, thread_id: email.thread_id).first
		if not conversation then
			conversation = self.create(user_id: email.user_id, thread_id: email.thread_id, most_recent_date: email.date)
		end
		conversation.emails << email
		if not conversation.most_recent_date or email.date > conversation.most_recent_date then
			conversation.most_recent_date = email.date
			conversation.save
		end
	end
end
