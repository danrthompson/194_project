angular.module('sidebar', ['resources.threads', 'contenteditable', 'ngTagsInput'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.directive('sidebar', [function(){
	return {
		controller: 'SidebarCtrl',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'sidebar/sidebar.html',
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
		// infer email we're replying to from last email in thread. this is
		// not the best way to do things.
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

	// if the user changes threads, clear the reply draft
	$scope.$watch($scope.getSelectedThread, function(oldValue, newValue) {
		if (oldValue != newValue) {
			$scope.eraseReply();
		}
	});

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

		$scope.labels_refreshing = true;

		Restangular.all('threads/').post(email).then(function() {
			$scope.draft = {};
			$scope.closeCompose();
			$scope.labels_refreshing = false;
		});
	};
}]);