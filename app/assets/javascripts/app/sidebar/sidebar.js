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

.controller('SidebarCtrl', ['$scope', '$location', '$element', 'Restangular', function($scope, $location, $element, Restangular) {

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

		var reply_to = thread.emails[thread.emails.length - 1];
		var email = {
			id: reply_to.id,
			body: $scope.reply.message
		};

		Restangular.all('emails/reply').customPOST(email);

		$scope.eraseReply();
	};

	$scope.toggleCollapse = function(email) {
		if (typeof email.collapsed === 'undefined') email.collapsed = true;
		email.collapsed = !email.collapsed;
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

.controller('ComposeCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
	$scope.draft = {};
	
	$scope.sendEmail = function(draft) {
		var email = {
			to: draft.to,
			subject: draft.subject,
			body: draft.content
		};

		Restangular.all('threads/').post(email);
	};
}]);