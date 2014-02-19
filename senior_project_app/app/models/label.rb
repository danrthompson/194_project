class Label < ActiveRecord::Base
	attr_accessible :name, :user_id, :primary
	belongs_to :user
	has_many :emails_labels
	has_many :emails, through: :emails_labels
	has_many :conversations
	validates :name, :user_id, presence: true

	@@non_primary_label_names = ['Important', 'Sent', 'Boomerang']

	def self.label_array_to_json(labels)
		label_array = []
		labels.each do |label|
			label_array << {id: label.id, name: label.name}
		end
		return label_array.to_json
	end

	def can_be_primary?
		if not self.name.in? @@non_primary_label_names then
			true
		else
			false
		end
	end
end
