angular.module('modals', [])

.controller('HelpModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.close = function() {
		$modalInstance.close();
	};
}])

.controller('AddLabelModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.new_title = "";

	$scope.dismiss = function(reason) {
		$modalInstance.dismiss(reason);
	};

	$scope.close = function() {
		if ($scope.new_title.length == 0) return;
		$modalInstance.close($scope.new_title);
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