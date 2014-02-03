class Folders < ActiveRecord::Base
  attr_accessible :name, :parent_id, :user_id

  belongs_to :user
  has_many :children, class_name: "Folder", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Folder"
end
