angular.module('workspace', ['resources.labels', 'resources.threads'])

.directive('workspace', [function(){
	return {
		controller: 'WorkspaceCtrl',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'workspace/workspace.html',
	};
}])

.directive('labelColumn', [function(){
	return {
		controller: 'WorkspaceCtrl',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'workspace/label_column.html',
	};
}])

.controller('WorkspaceCtrl', ['$scope', '$location', 'Restangular', '$http', function($scope, $location, Restangular, $http) {
	$scope.archiveThread = function(thread) {
		$http.delete('/api/threads/' + thread.id).success(function(data, status) {
			$scope.refreshLabels();
		});
	};

	$scope.hideLabel = function(label) {
		Restangular.one('labels/', label.id).customPUT({id: label.id, hidden: true}).then($scope.refreshLabels);
	};

	$scope.editLabel = function(label) {
		if (typeof label.editing === 'undefined') label.editing = false;
		label.editing = !label.editing;
	};

	// jQuery ui sortable options for the columns
	$scope.labelSortableOptions = {
		tolerance: "pointer",
		stop: function(e, ui) {
			$scope.labels.forEach(function(label, i) {
				label.order = i;
				label.customPUT({id: label.id, order: label.order});
			});
		}
	};

	// ui sortable options for threads in columns
	$scope.emailGroupSortableOptions = {
		placeholder: "thread-placeholder",
		connectWith: ".thread-list",
		forcePlaceholderSize: true,
		tolerance: "pointer",
		scroll: false,
		helper: 'clone',
		appendTo: 'workspace',
		zIndex: 9999,
		stop: function(e, ui) {

			var position = ui.item.sortable.dropindex,
				label_index = ui.item.sortable.droptarget.scope().$index,
				label = $scope.labels[label_index],
				thread = label.threads[position];

			var new_order = calculateOrder(label, position);

			// send a request to update position of thread in new label
			Restangular.one('threads', thread.id).customPUT({id: thread.id, order: new_order, label_id: label.id}).then($scope.refreshLabels);
		}
	};

	// calculate order based on the threads it's sandwiched between
	function calculateOrder(label, position) {
		var before = label.threads[position - 1],
			after = label.threads[position+1];

		if (!before && !after) {
			return -1;
		} else if (!before) {
			return after.order + 10;
		} else if (!after) {
			return before.order - 10;
		} else {
			return (after.order + before.order)/2;
		}

	}
}]);
