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
		return (conversations.map! {|conversation| conversation.to_hash}).to_json
	end

	def to_hash
		emails = self.emails.order(:date)
		from_addrs = []
		emails.each do |email|
			email.email_addresses.where(from_address: true).each do |from_addr|
				if from_addr.name then
					if not from_addr.name.in? from_addrs then
						from_addrs << from_addr.name
					end
				else
					if not from_addr.email_address.in? from_addrs then
						from_addrs << from_addr.email_address
					end
				end
			end
		end
		from_addrs = from_addrs.join(', ')
		return {id: self.id, subject: emails.first.subject, date: emails.last.date.to_s, from_names: from_addrs}
	end
end