angular.module('workspace', ['resources.labels', 'resources.threads'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

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