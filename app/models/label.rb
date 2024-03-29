class Label < ActiveRecord::Base
	attr_accessible :name, :user_id, :hidden, :order_value
	belongs_to :user
	has_many :emails_labels
	has_many :emails, through: :emails_labels
	has_many :conversations
	validates :name, :user_id, presence: true

	@@non_primary_label_names = ['Important', 'Sent', 'Boomerang']
	@@names_not_removed_on_archive = ['Important', 'Sent', 'Boomerang']
	@@gmail_label_name_to_readable_name = {"\\Inbox" => 'Inbox', "\\Important" => 'Important', "\\Sent" => 'Sent'}
	@@gmail_readable_name_to_label_name = {'Inbox' => "\\Inbox", 'Sent' => "\\Sent"}

	def self.legible_name(label_name)
		if @@gmail_label_name_to_readable_name[label_name] then
			@@gmail_label_name_to_readable_name[label_name]
		else
			label_name
		end
	end

	def self.gem_name(label_name)
		if @@gmail_readable_name_to_label_name[label_name] then
			@@gmail_readable_name_to_label_name[label_name]
		else
			label_name
		end
	end

	def self.label_array_to_json(labels)
		return (labels.map {|label| label.to_hash}).to_json
	end

	def to_hash
		return {
			id: self.id,
			title: self.name,
			order: self.order_value,
			threads: self.conversations.where(archived: false).order(:order_value).reverse_order().map {|conversation| conversation.to_hash}
		}
	end

	def can_be_primary?
		if not self.name.in? @@non_primary_label_names then
			true
		else
			false
		end
	end

	def removed_on_archive?
		if not self.name.in? @@names_not_removed_on_archive then
			true
		else
			false
		end
	end
end
