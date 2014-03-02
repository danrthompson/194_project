

// THIS FILE TELLS CODEKIT WHICH FILES TO IMPORT

// MAIN APP
// @codekit-append app.js

// COMMON
// - Resources
	// @codekit-append common/resources/conversations.js
	// @codekit-append common/resources/labels.js

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
		'ui.directives',
		// 'route-segment',
		// 'view-segment'
	])

// Configuration settings for the angular app
.constant('settings', {
	api_base_url: 'http://localhost:3000/'
})

.controller('AppCtrl', ['$scope', function($scope) {
}]);


/* **********************************************
     Begin labels.js
********************************************** */

angular.module('resources.labels', ['ngResource'])

.factory('Labels', ['$resource', 'settings' , function($resource, settings) {
	return $resource(settings.api_base_url + 'labels/:id');
}]);

/* **********************************************
     Begin navbar.js
********************************************** */

angular.module('navbar', ['resources.labels'])

.controller('NavbarCtrl', ['$scope', '$location', 'Labels', function($scope, $location, Labels) {
	$scope.labels = Labels.query();

	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };

	$scope.compose       = function() { alert("Not implemented yet."); };
	$scope.openHelp      = function() { alert("Not implemented yet."); };
	$scope.openSettings  = function() { alert("Not implemented yet."); };
	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);

/* **********************************************
     Begin workspace.js
********************************************** */

angular.module('workspace', ['resources.labels'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.controller('WorkspaceCtrl', ['$scope', '$location', 'Labels', function($scope, $location, Labels) {

	$scope.labels = Labels.query();

	$scope.selectThread = function(thread) {
		$location.path("thread/" + thread.uid);
	};

	$scope.archiveThread = function(thread) {
		alert("Not implemented yet.");
	};

	$scope.reorderLabels = function(labels) {
		alert("Not implemented yet.");
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

angular.module('sidebar', [])

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

.controller('SidebarCtrl', [function(){
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