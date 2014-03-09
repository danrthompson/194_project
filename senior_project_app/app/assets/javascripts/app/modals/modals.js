angular.module('modals', [])

.controller('HelpModalCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.labels = Labels.query();

	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };
	
	$scope.compose       = function() { alert("Not implemented yet."); };
	$scope.openHelp      = function() { alert("Not implemented yet."); };
	$scope.openSettings  = function() { alert("Not implemented yet."); };
	$scope.openAbout     = function() { alert("Not implemented yet."); };
}]);