(function() {

	'use strict';

	angular.module('controllers.login', [
		'ngRoute',
		'services.auth'
	]).controller('LoginController', [
		'$scope',
		'$location',
		'AuthService',
		function($scope, $location, AuthService) {
			if (AuthService.isOnline()) {
				$location.path('/pedidos');
			}

			$scope.user = {
				login: {
					email: '',
					password: '',
				},
				register: {
					firstName: '',
					lastName: '',
					phone: '',
					address: '',
					email: '',
					password: '',
					passwordRepeat: ''
				}
			};

			$scope.signIn = function(){
				AuthService.login($scope.user.login.email, $scope.user.login.password);
			};

			$scope.signUp = function(){

			};
		}
	]);
})();
