angular.module('modals', [])

.controller('HelpModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.close = function() {
		$modalInstance.close();
	};
}])

.controller('AccountModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.dismiss = function(reason) {
		$modalInstance.dismiss(reason);
	};

	$scope.close = function(result) {
		$modalInstance.close(result);
	};
}]);