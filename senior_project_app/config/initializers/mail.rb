Mail.defaults do
  delivery_method :smtp, { 
    :address => 'smtp.gmail.com',
    :port => '587',
    domain: 'gmail.com',
    :authentication => :xoauth2,
    :enable_starttls_auto => true
  }
end