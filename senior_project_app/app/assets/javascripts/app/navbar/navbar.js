angular.module('navbar', [])

.directive('navbar', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: 'NavbarCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: 'wutsup',
		templateUrl: 'templates/navbar/navbar',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.controller('NavbarCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };
	$scope.openHelp      = function() { alert("Not implemented yet."); };
	$scope.openSettings  = function() { alert("Not implemented yet."); };
	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);