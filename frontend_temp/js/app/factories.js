checkmail.factory('Labels', ['$resource', 'settings', function($resource, settings) {
	return $resource(settings.api_base_url + '/api/get_labels/:user_id', { user_id: 1 });
}]);

checkmail.factory('Threads', ['$resource', 'settings', function($resource, settings) {
  return $resource(settings.api_base_url + '/api/get_threads/:label_id', { label_id: '@label_id' });
}]);