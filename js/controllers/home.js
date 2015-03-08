(function() {

	'use strict';
	angular.module('controllers.home', [
		'ngRoute',
		'services.global',
		'services.message',
		'directives.home-slider'
	]).controller('HomeController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'MessageService',
		function($scope, $location, $routeParams, GlobalService, MessageService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			if(angular.isMobile) {
				$location.path('/'+$scope.branch+'/pedidos');
				return;
			}
			
			var _reset = function(data, value) {
				for(var key in data) {
					data[key] = value;
				}
			};

			$scope.page = GlobalService.Page();

			$scope.data = {
				contact: {
					name: '',
					email: '',
					phone: '',
					message: ''
				},
				franchises: {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					city: '',
					country: '',
					message: ''
				}
			};

			$scope.errors = {
				contact: {
					first: false,
					email: false,
					phone: false,
					message: false
				},
				franchises: {
					firstName: false,
					lastName: false,
					email: false,
					phone: false,
					city: false,
					country: false,
					message: false
				}
			};

			$scope.send = function (type) {
				_reset($scope.errors[type], false);
				MessageService.Send(type, $scope.data[type], $scope.errors[type]);
			};
		}
	]);
})();
