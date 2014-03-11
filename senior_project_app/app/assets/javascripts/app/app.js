angular.module('checkmail', [
		'navbar',
		'workspace',
		'sidebar',
		'ui.sortable',
		'ui.bootstrap', 
		'restangular',
		'templates'
		// 'route-segment',
		// 'view-segment'
	])

// Configuration settings for the angular app
.constant('settings', {
	api_base_url: 'http://localhost:3000/api/'
})

.config(function($httpProvider) {
	var authToken = $("meta[name=\"csrf-token\"]").attr("content");
	$httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
})

.controller('AppCtrl', ['$scope', 'Labels', 'settings', function($scope, Labels) {
	$scope.labels = Labels.query();

	$scope.state = {
		selected_thread: null,
		composing_email: false
	};

	$scope.selectThread = function(thread) {
		$scope.state.selected_thread = thread;
		$scope.state.composing_email = false;
	};

	$scope.deselectThread = function() {
		$scope.state.selected_thread = null;
	};

	$scope.isSelectedThread = function(thread) {
		return thread === $scope.state.selected_thread;
	};

	$scope.openCompose = function() {
		$scope.state.composing_email = true;
		$scope.state.selected_thread = null;
	};

	$scope.newLabel = function() {
		var new_label = new Labels();
		new_label.title = "Wussussup";
		new_label.$save();
	};

	$scope.closeCompose = function() {
		$scope.state.composing_email = false;
	};

	$scope.threadIsSelected = function() {
		var type = typeof $scope.state.selected_thread;
		return (type != "undefined" && $scope.state.selected_thread !== null);
	};

	$scope.composingEmail = function() {
		return $scope.state.composing_email;
	};

	$scope.sidebarIsVisible = function() {
		return $scope.threadIsSelected() || $scope.composingEmail();
	};
}]);
