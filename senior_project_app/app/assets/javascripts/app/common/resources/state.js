angular.module('resources.state', [])

.service('State', [function($resource, settings) {
	var selected_thread;

	this.selectThread = function(thread) {
		selected_thread = thread;
	};

	this.sidebarIsVisible = function() {
		return (typeof selected_thread != "undefined");
	};
}]);