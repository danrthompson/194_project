

// THIS FILE TELLS CODEKIT WHICH FILES TO IMPORT

// MAIN APP
// @codekit-append app.js

// COMMON
// - Directives
// - Resources
	// @codekit-append common/resources/conversations.js
	// @codekit-append common/resources/labels.js
	// @codekit-append common/resources/threads.js
	// @codekit-append common/resources/state.js

// COMPONENTS
// - Navbar
	// @codekit-append navbar/navbar.js

// - Workspace
	// @codekit-append workspace/workspace.js

// - Sidebar
	// @codekit-append sidebar/sidebar.js

// - Modals
	// @codekit-append modals/modals.js

/* **********************************************
     Begin app.js
********************************************** */

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


/* **********************************************
     Begin labels.js
********************************************** */

angular.module('resources.labels', ['ngResource'])

.service('Labels', ['$resource', 'settings' , function($resource, settings) {
	return $resource(settings.api_base_url + 'labels/:id');
}]);

/* **********************************************
     Begin threads.js
********************************************** */

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

/* **********************************************
     Begin state.js
********************************************** */

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

/* **********************************************
     Begin navbar.js
********************************************** */

angular.module('navbar', [])

.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };
	$scope.openHelp      = function() { alert("Not implemented yet."); };
	$scope.openSettings  = function() { alert("Not implemented yet."); };
	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);

/* **********************************************
     Begin workspace.js
********************************************** */

angular.module('workspace', ['resources.labels', 'resources.threads'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.controller('WorkspaceCtrl', ['$scope', '$location', 'Threads', function($scope, $location, Threads) {

	$scope.archiveThread = function(thread) {
		alert("Not implemented yet.");
	};

	$scope.reorderLabels = function(labels) {
		alert("Not implemented yet.");
	};

	$scope.addLabel = function(label) {
	};

	$scope.editLabel = function(label) {
		alert("Not implemented yet.");
	};

	$scope.addContributor = function(label) {
		alert("Not implemented yet.");
	};

	$scope.addFilter = function(label) {
		alert("Not implemented yet.");
	};

	$scope.emailGroupSortableOptions = {
		placeholder: "email-placeholder",
		connectWith: ".email-group",
		forcePlaceholderSize: true,
		scrollSensitivity: 0,
		tolerance: "pointer",
		zIndex: 9999
	};
}]);

/* **********************************************
     Begin sidebar.js
********************************************** */

angular.module('sidebar', ['resources.threads'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.directive('sidebar', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: 'SidebarCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'app/sidebar/view.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.controller('SidebarCtrl', ['$scope', '$location', 'Threads', function($scope, $location, Threads) {
	// $scope.$watch('state.selected_thread', function(thread) {
	// 	$scope.selected_thread = thread;
	// });

	$scope.getFrom = function(email) {
		return _.find(email.email_addresses, function(d) {
			return d.address_type === "from";
		});
	};

	$scope.replyToThread = function(thread, reply) {
		var whole_reply = {
			message: reply,
		}
	};

	$scope.expandReply = function() {
		alert("Not yet implemented.");
	};
}]);

/* **********************************************
     Begin modals.js
********************************************** */

angular.module('modals', [])

.controller('HelpModalCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.labels = Labels.query();

	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };
	
	$scope.compose       = function() { alert("Not implemented yet."); };
	$scope.openHelp      = function() { alert("Not implemented yet."); };
	$scope.openSettings  = function() { alert("Not implemented yet."); };
	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);