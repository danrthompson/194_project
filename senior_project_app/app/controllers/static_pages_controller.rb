class StaticPagesController < ApplicationController
  def index
  	render :layout => false
  end

  def home
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
