class Label < ActiveRecord::Base
	attr_accessible :name, :user_id
	belongs_to :user
	has_and_belongs_to_many :emails
	validates :name, :user_id, presence: true
end
