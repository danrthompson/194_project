class HomepageController < ApplicationController
	def testing_angular
		render action: 'testing_angular', layout: false
	end
end