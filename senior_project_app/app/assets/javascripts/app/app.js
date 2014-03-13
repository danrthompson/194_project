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

.controller('AppCtrl', ['$scope', 'Restangular', 'settings', function($scope, Restangular, settings) {
	Restangular.setBaseUrl('/api/');

	// console.log(Restangular.all('/api/labels'));

	Restangular.all('labels').getList().then(function(labels) {
		$scope.labels = labels;
	});

	$scope.state = {
		selected_thread: null,
		composing_email: false
	};

	$scope.selectThread = function(thread) {
		var several = Restangular.several,
			args = ['emails'].concat(thread.email_ids);

		// ugly hack to use an array as an argument to a several call
		several.apply(this, args).getList().then(function(emails) {
			thread.emails = emails;
		});

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