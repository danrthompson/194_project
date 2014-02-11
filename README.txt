194_project
===========

We are running a Rails 3.2.16 app, using Ruby version 2.1.0 (using RVM to manage the Ruby distribution).


===
useful sites:
https://github.com/nfo/gmail_xoauth
https://github.com/google/google-api-ruby-client
http://blog.baugues.com/google-calendar-api-oauth2-and-ruby-on-rails
https://github.com/nu7hatch/gmail
https://cloud.google.com/console

http://guides.rubyonrails.org/action_mailer_basics.html
http://carlosgabaldon.com/articles/building-a-rails-gmail-client-outside-in/
http://adayinthepit.com/2012/07/13/google-apis-sinatra-oauth2/

===
Potentially useful commands:
rvm get stable # upgrade RVM
rvm --default use 2.1.0 # set ruby version 2.1.0 as the default
gem install rails -v 3.2.16 # install rails version 3.2.16

# commands below will create a new postgres user with the permission to create new databases
psql
create role senior_project_app with createdb login;
\q

rake db:create # creates the databases used by the app
rake db:migrate # migrates the database to the latest schema


python oauth2.py --generate_oauth2_token --client_id=446049003901-t1pco3ufp89tuu9egptlpli88aescbae.apps.googleusercontent.com --client_secret=RDTaHv0XAtC3hIYemcsrDCxg

https://accounts.google.com/o/oauth2/auth?client_id=446049003901.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=https%3A%2F%2Fmail.google.com%2F


===
Useful info

email:
danielrthompsonjr@gmail.com

username:
danielrthompsonjr

password:
>TZQs9iuZ{Mx6B3X

app:
auth uri:
https://accounts.google.com/o/oauth2/auth
client_secret:
1YkujFdHxBrE184DyF86LM-I
token_uri:
https://accounts.google.com/o/oauth2/token
client_email:
446049003901@developer.gserviceaccount.com
client_x509_cert_url:
https://www.googleapis.com/robot/v1/metadata/x509/446049003901@developer.gserviceaccount.com
client_id:
446049003901.apps.googleusercontent.com
auth_provider_x509_cert_url:
https://www.googleapis.com/oauth2/v1/certs

emails
labels (many)


Message methods:
all_parts
attachment
attachment?
attachments
bcc
body
body_encoding
cc
cc_addrs
comments
content_description
content_type
date
decoded
decode_body
destinations
envelope_date
envelope_from
from
from_addrs
header
header_fields
headers
html_part
keywords
multipart?
parts
raw_envelope
raw_source
read
reply
reply_to
sender
subject
text_part
to
to_addrs


Email methods:
display
envelope
flag
label
mark
message
move
move_to
presence
pretty_print
inspect
ppinspect
public_methods
raw_message
read!
spam!
star!
to_json
uid
unflag
unread!
unstar!



