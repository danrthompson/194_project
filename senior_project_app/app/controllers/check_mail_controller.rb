class CheckMailController < ApplicationController
  def index
    if not current_user then
      redirect_to action: :home and return
    end
    current_user.delay.pull_email_if_necessary
  	render :layout => false
  end

  def home
    if current_user then
      redirect_to action: :index and return
    end
    render :layout => false

  end

  def welcome
    render :layout => false
  end

  def about
  	render :layout => false
  end

  def press
  	render :layout => false
  end
  
  def tour
  	render :layout => false
  end
end
