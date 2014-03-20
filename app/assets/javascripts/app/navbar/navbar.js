angular.module('navbar', ['modals'])

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
		templateUrl: 'navbar/navbar.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.controller('NavbarCtrl', ['$scope', '$modal', function($scope, $modal) {
	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };

	$scope.addLabel = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modals/add_label.html',
			controller: 'AddLabelModalCtrl',
		})

		modalInstance.result.then(function(title) {
			console.log(title);
		})
	};


	$scope.openHelp      = function() {
		$modal.open({
			templateUrl: 'modals/help.html',
			controller: 'HelpModalCtrl',
		});
	};
	
	$scope.openSettings  = function() {
		$modal.open({
			templateUrl: 'modals/account.html',
			controller: 'AccountModalCtrl',
		});
	};

	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);