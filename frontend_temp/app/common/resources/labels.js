angular.module('resources.labels', ['ngResource'])

.service('Labels', ['$resource', 'settings' , function($resource, settings) {
	return $resource(settings.api_base_url + 'labels/:id');
}]);