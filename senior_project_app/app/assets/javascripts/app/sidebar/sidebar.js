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
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: 'wutsup',
		templateUrl: 'templates/sidebar/sidebar',
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