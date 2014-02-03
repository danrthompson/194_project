class Email
	include ActiveModel::Validations
	include ActiveModel::Conversion
	extend ActiveModel::Naming

	attr_accessor :to, :subject, :body
	attr_accessible :to, :subject, :body
	validate :to_field_valid

	def to_field_valid
		if to.blank? then
			errors.add(:to, "can't be blank.")
		else
			emails = self.to.split(',').map!(&:strip)
			emails.each do |email|
				if not email.match(/\A[^@]+@[^@]+\z/) then
					errors.add(:to, "must contain valid emails.")
					break
				end
			end
		end
	end
end