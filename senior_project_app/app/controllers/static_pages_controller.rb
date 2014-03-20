class StaticPagesController < ApplicationController
  def index
    if not current_user then
      redirect_to action: :home and return
    end
  	render :layout => false
  end

  def home
    if current_user then
      redirect_to action: :index and return
    end
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
