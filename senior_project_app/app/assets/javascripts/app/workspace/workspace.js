angular.module('workspace', ['resources.labels', 'resources.threads'])

// .config(['$routeSegmentProvider',function($routeSegmentProvider) {
	
// }])

.directive('workspace', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: 'WorkspaceCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: 'wutsup',
		templateUrl: 'workspace/workspace.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.directive('labelColumn', [function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: 'WorkspaceCtrl',
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: 'wutsup',
		templateUrl: 'workspace/label_column.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}])

.controller('WorkspaceCtrl', ['$scope', '$location', 'Restangular', function($scope, $location, Restangular) {

	$scope.completeThread = function(thread) {
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

	$scope.editLabel = function(label) {
		if (label.new_title != null && label.new_title.length > 0) {
			label.title = label.new_title;
			label.customPUT({id: label.id, title: label.title});
		}

		label.new_title = null;
		label.editing = false;
	};

	$scope.labelSortableOptions = {
		tolerance: "pointer",
		stop: function(e, ui) {
			$scope.labels.forEach(function(label, i) {
				label.order = i;
				label.customPUT({id: label.id, order: label.order});
			});
		}
	};

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

			Restangular.one('threads', thread.id).customPUT({id: thread.id, order: new_order, label_id: label.id});
		}
	};

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
