angular.module('resources.threads', [])

.service('Threads', [function() {
	var selected_thread;

	this.selectThread = function(thread) {
		selected_thread = thread;
	};

	this.deselectThread = function() {
		selected_thread = null;
	};

	this.getSelectedThread = function() {
		return selected_thread;
	};

	this.sidebarIsVisible = function() {
		return (typeof selected_thread != "undefined");
	};
}]);