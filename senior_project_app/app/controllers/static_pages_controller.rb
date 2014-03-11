class StaticPagesController < ApplicationController
  def index
  	render :layout => false
  end

  def home
  	render :layout => false
  end
end
