angular.module('resources.labels', ['ngResource'])

.factory('Labels', ['$resource', 'settings' , function($resource, settings) {
	return $resource(settings.api_base_url + 'labels/:id');
}]);