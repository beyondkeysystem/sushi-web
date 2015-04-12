(function() {

	'use strict';
	angular.module('controllers.admin-clients', [
		'ngRoute',
		'directives.admin-navbar',
		'services.auth',
		'services.general'
	]).controller('AdminClientsController', [
		'$scope',
		'$http',
		'$timeout',
		'$location',
		'AuthService',
		'GeneralService',
		function($scope, $http, $timeout, $location, AuthService, GS) {

			$scope.results = [];

			$scope.columns = [
				{id: 'firstName', name: 'Nombre', isEditable: false, type: 'text'},
				{id: 'phone', name: 'Telefono', isEditable: false, type: 'text'},
				{id: 'address', name: 'Direccion', isEditable: false, type: 'text'},
				{id: 'email', name: 'e-mail', isEditable: false, type: 'text'}
			];

			$http.get('/api/v1/user/isAdmin/0').then(function (results) {
				for (var i = results.data.length - 1; i >= 0; i--) {
					results.data[i].firstName += ' '+results.data[i].lastName;
				};
				$scope.results = results.data;
			});

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
