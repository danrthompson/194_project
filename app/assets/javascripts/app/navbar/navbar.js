angular.module('navbar', ['modals'])

.directive('navbar', [function(){
	return {
		controller: 'NavbarCtrl',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'navbar/navbar.html',
	};
}])

.controller('NavbarCtrl', ['$scope', '$modal', 'Restangular', function($scope, $modal, Restangular) {
	$scope.scrollToLabel = function(label) { alert("Not implemented yet."); };

	$scope.addLabel = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modals/add_label.html',
			controller: 'AddLabelModalCtrl',
		});

		modalInstance.result.then(function(title) {
			Restangular.all('labels/').post({
				title: title,
				order: null
			}).then(function() {
				$scope.refreshLabels();
			});
		});
	};


	$scope.openHelp = function() {
		$modal.open({
			templateUrl: 'modals/help.html',
			controller: 'HelpModalCtrl',
		});
	};
	
	$scope.openSettings = function() {
		$modal.open({
			templateUrl: 'modals/account.html',
			controller: 'AccountModalCtrl',
		});
	};
}]);