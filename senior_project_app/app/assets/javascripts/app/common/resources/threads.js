angular.module('resources.threads', [])

.service('Threads', ['$resource', 'settings', function($resource, settings) {
	return $resource(settings.api_base_url + 'labels/:id');
}]);