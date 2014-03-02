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