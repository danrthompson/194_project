angular.module('checkmail', [
		'navbar',
		'workspace',
		'sidebar',
		'ui.sortable',
		'restangular',
		'templates'
		// 'route-segment',
		// 'view-segment'
	])

// .run(['$window', '$templateCache', function($window, $templateCache) {
//   var templates = $window.JST,
//       fileName,
//       fileContent;
 
//   for (fileName in templates) {
//     fileContent = templates[fileName];
//     $templateCache.put(fileName, fileContent);
//     // Note that we're passing the function fileContent, and not the object
//     // returned by its invocation. More on that on Digging Deeper.
//     console.log(fileName);
//   }
// }])

// Configuration settings for the angular app
.constant('settings', {
	api_base_url: 'http://localhost:3000/api/'
})

.controller('AppCtrl', ['$scope', 'Labels', 'settings', function($scope, Labels) {
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
