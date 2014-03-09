angular.module('checkmail', [
		'navbar',
		'workspace',
		'sidebar',
		'ui.sortable',
		'restangular'
		// 'route-segment',
		// 'view-segment'
	])

// Configuration settings for the angular app
.constant('settings', {
	api_base_url: 'http://localhost:3000/'
})

.controller('AppCtrl', ['$scope', 'Labels', function($scope, Labels) {
	$scope.labels = Labels.query();

	$scope.state = {
		selected_thread: null,
		email_draft: null,
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
