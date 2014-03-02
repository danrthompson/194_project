angular.module('checkmail', [
		'navbar',
		'workspace',
		'sidebar',
		'ui.directives',
		// 'route-segment',
		// 'view-segment'
	])

// Configuration settings for the angular app
.constant('settings', {
	api_base_url: 'http://localhost:3000/'
})

.controller('AppCtrl', ['$scope', function($scope) {
}]);
