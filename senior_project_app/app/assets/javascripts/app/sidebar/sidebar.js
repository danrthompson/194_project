angular.module('sidebar', ['resources.threads', 'contenteditable', 'ngTagsInput'])

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
		templateUrl: 'sidebar/sidebar.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.controller('SidebarCtrl', ['$scope', '$location', '$element', function($scope, $location, $element) {
	// $scope.$watch('state.selected_thread', function(thread) {
	// 	$scope.selected_thread = thread;
	// });

	// $scope.eraseReply();

	$scope.expandReply = function() {
		$scope.reply.address = getFrom(getLastEmail($scope.getSelectedThread())).address;
		$scope.reply.expanded  = true;
	};

	$scope.eraseReply = function() {
		$scope.reply = {
			expanded: false,
			message: null,
			address: null
		};
	};

	$scope.sendReply = function(thread) {
		console.log(thread, $scope.reply);

		$scope.eraseReply();
	};

	$scope.$watch($scope.getSelectedThread, function(oldValue, newValue) {
		if (oldValue != newValue) {
			$scope.eraseReply();
		}
	});

	window.resizeIframe = function(e) {
		console.log(e);
	};

	function getLastEmail(thread) {
		return _.last(thread.emails);
	}

	function getFrom (thread) {
		return _.find(thread.email_addresses, function(d) {
			return d.type === "from";
		});
	}
}])

.controller('ComposeCtrl', ['$scope', 'Threads', function($scope, Threads) {
	$scope.draft = {};
	
	$scope.sendEmail = function() {
		console.log($scope.draft);
		$scope.draft = {};
		$scope.closeCompose();
	};
}]);