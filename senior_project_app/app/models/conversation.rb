class Conversation < ActiveRecord::Base
  attr_accessible :thread_id, :most_recent_date, :user_id
  has_many :emails
  belongs_to :user
  belongs_to :label

	def self.add_email_to_conversation(email)
		conversation = self.where(user_id: email.user_id, thread_id: email.thread_id).first
		if not conversation then
			conversation = self.create(user_id: email.user_id, thread_id: email.thread_id, most_recent_date: email.date)
		end
		conversation.emails << email
		if not conversation.most_recent_date or email.date > conversation.most_recent_date then
			conversation.most_recent_date = email.date
		end
		if not conversation.label then
			conversation.label = email.get_primary_label
		end
		conversation.save
	end

	def self.conversation_array_to_json(conversations)

	end

	def to_hash
		email_array = []
		return {id: self.id, }
	end
end
