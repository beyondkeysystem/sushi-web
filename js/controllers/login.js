(function() {

	'use strict';

	angular.module('controllers.login', [
		'ngRoute',
		'services.global',
		'services.auth'
	]).controller('LoginController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'AuthService',
		function($scope, $location, $routeParams, GlobalService, AuthService) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			if (AuthService.isOnline()) {
				if (AuthService.isAdmin()) {
					$location.path('/admin');
				} else {
					$location.path('/'+$scope.branch+'/pedidos');
				}
				return;
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
				//TODO: validate sign in form inputs
				AuthService.login($scope.user.login.email, $scope.user.login.password).then(function(user) {
					if(angular.isString(user.id) && user.id.length){
						if (user.isAdmin) {
							$location.path('/admin');
						} else {
							$location.path('/'+$scope.branch+'/pedidos');	
						}
					} else {
						console.log('show signin error');
					}
				});
			};

			$scope.signUp = function(){
				//TODO: validate sign up form inputs
				AuthService.register($scope.user.register).then(function(user) {
					if(angular.isString(user.id) && user.id.length){
						$location.path('/'+$scope.branch+'/pedidos');
					}  else {
						console.log('show signup error');
					}
				});
			};
		}
	]);
})();
