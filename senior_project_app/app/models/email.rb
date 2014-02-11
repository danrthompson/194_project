class Email < ActiveRecord::Base
  attr_accessible :date, :html_body, :read, :sent, :subject, :text_body, :thread_id, :uid
end
