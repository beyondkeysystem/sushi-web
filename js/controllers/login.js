(function() {

	'use strict';

	angular.module('controllers.login', [
		'ngRoute',
		'services.global',
		'services.auth',
		'services.validate'
	]).controller('LoginController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'AuthService',
		'ValidateService',
		function($scope, $location, $routeParams, GlobalService, AuthService, Validate) {
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

			$scope.errors = {
				login: {
					email: false,
					password: false,
				},
				register: {
					firstName: false,
					lastName: false,
					phone: false,
					address: false,
					email: false,
					password: false,
					passwordRepeat: false
				}
			};

			$scope.signIn = function(){
				var invalidFields = Validate.All($scope.user.login);
				if(!invalidFields.length) {
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
				}
			};

			$scope.signUp = function(){
				var invalidFields = Validate.All($scope.user.register);
				if(!invalidFields.length) {
					AuthService.register($scope.user.register).then(function(user) {
						if(angular.isString(user.id) && user.id.length){
							$location.path('/'+$scope.branch+'/pedidos');
						}  else {
							console.log('show signup error');
						}
					});
				}
			};
		}
	]);
})();
