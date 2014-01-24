Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '446049003901-t1pco3ufp89tuu9egptlpli88aescbae.apps.googleusercontent.com', 'RDTaHv0XAtC3hIYemcsrDCxg', {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://mail.google.com/',
    redirect_uri:'http://localhost:3000/auth/google_oauth2/callback'
  }
end