194_project
===========

We are running a Rails 3.2.16 app, using Ruby version 2.1.0 (using RVM to manage the Ruby distribution).


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
