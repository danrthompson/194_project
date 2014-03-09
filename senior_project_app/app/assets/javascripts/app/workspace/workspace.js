angular.module('workspace', ['resources.labels', 'resources.threads'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.directive('workspace', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: 'WorkspaceCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: 'wutsup',
		templateUrl: 'templates/workspace/workspace',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

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