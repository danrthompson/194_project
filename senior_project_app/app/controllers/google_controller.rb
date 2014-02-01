require 'awesome_print'

class GoogleController < ApplicationController   
  def authenticate
    #What data comes back from OmniAuth?     
    @auth = request.env["omniauth.auth"]
    #Use the token from the data to request a list of calendars
    @token = @auth['credentials']['token']
    @email = @auth['info']['email']
    @name = @auth['info']['first_name']
    # render text: ap(@auth) and return
    # render text: @token and return
    # client = Google::APIClient.new
    # client.authorization.access_token = @token
    # service = client.discovered_api('calendar', 'v3')
    # @result = client.execute(
    #   :api_method => service.calendar_list.list,
    #   :parameters => {},
    #   :headers => {'Content-Type' => 'application/json'})
    gmail = Gmail.connect(:xoauth, @email, token: @token)
    @count = gmail.inbox.count
  end
end