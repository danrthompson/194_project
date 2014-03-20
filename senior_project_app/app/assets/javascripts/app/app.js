angular.module('checkmail', [
		'navbar',
		'workspace',
		'sidebar',
		'ui.sortable',
		'ui.bootstrap', 
		'restangular',
		'templates',
		'common.directives',
		'angularMoment'
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

.controller('AppCtrl', ['$scope', 'Restangular', 'settings', '$sce', function($scope, Restangular, settings, $sce) {
	Restangular.setBaseUrl('/api/');

	$scope.labels = [];

	$scope.refreshLabels = function() {
		$scope.labels_refreshing = true;
		Restangular.all('labels').getList().then(function(labels) {
			labels.forEach(function(e) {
				e.threads = _.sortBy(e.threads, 'order').reverse();
			});

			labels = _.sortBy(labels, 'order');

			$scope.labels = labels;
			$scope.labels_refreshing = false;
		});
	};

	$scope.state = {
		selected_thread: null,
		composing_email: false
	};

	$scope.toTrusted = $sce.trustAsHtml;

	$scope.getTrustedUrl = $sce.getTrustedUrl;

	$scope.selectThread = function(thread) {
		var several = Restangular.several,
			args = ['emails'].concat(thread.email_ids);

		// ugly hack to use an array as an argument to a several call
		several.apply(this, args).getList().then(function(emails) {
			emails.forEach(function(email) {
				email.html_url = $sce.trustAsResourceUrl("/api/emails/" + email.id + "/html");
				email.collapsed = true;
			});

			emails[emails.length - 1].collapsed = false;

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

	$scope.getSelectedThread = function() {
		return $scope.state.selected_thread;
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

	$scope.closeSidebar = function() {
		$scope.state.composing_email = false;
		$scope.state.selected_thread = null;
	};

	$scope.sidebarIsVisible = function() {
		return $scope.threadIsSelected() || $scope.composingEmail();
	};
}]);