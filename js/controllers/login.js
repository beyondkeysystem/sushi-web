(function() {

	'use strict';

	angular.module('controllers.login', [
		'ngRoute',
		'services.global',
		'services.auth',
		'services.validate',
		'resources.user'
	]).controller('LoginController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'AuthService',
		'ValidateService',
		'User',
		function($scope, $location, $routeParams, GlobalService, AuthService, Validate, User) {
			$scope.branch = GlobalService.Branch($routeParams.branch, true);
			if (AuthService.isOnline()) {
				if (AuthService.isAdmin()) {
					$location.path('/admin');
				} else {
					$location.path('/'+$scope.branch+'/pedidos');
				}
				return;
			}

			var _reset = function(data, value) {
				for(var key in data) {
					data[key] = value;
				}
			};

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
				var i, key, invalidFields;
				_reset($scope.errors.login);
				invalidFields = Validate.All($scope.user.login);
				if(!invalidFields.length) {
					AuthService.login($scope.user.login.email, $scope.user.login.password).then(function(user) {
						if(angular.isString(user.id) && user.id.length){
							if (user.isAdmin) {
								$location.path('/admin');
							} else {
								$location.path('/'+$scope.branch+'/pedidos');	
							}
						} else {
							$scope.errors.login.email = true;
							$scope.errors.login.password = true;
						}
					}, function () {//In case of error
						$scope.errors.login.email = true;
						$scope.errors.login.password = true;
					});
				} else {
					for (i = 0; i < invalidFields.length; i++) {
						key =invalidFields[i];
						$scope.errors.login[key] = true;
					};
				}
			};

			$scope.signUp = function(){
				var i, key, user, invalidFields;
				_reset($scope.errors.register);
				invalidFields = Validate.All($scope.user.register);
				if(!invalidFields.length) {
					user = new User($scope.user.register);
					AuthService.register(user).then(function(newUser) {
						console.log(newUser.id, typeof newUser.id);
						if(angular.isString(newUser.id) && newUser.id.length){
							$location.path('/'+$scope.branch+'/pedidos');
						}  else {
							console.log('show signup error');
						}
					});
				} else {
					for (i = 0; i < invalidFields.length; i++) {
						key =invalidFields[i];
						$scope.errors.register[key] = true;
					};
				}
			};
		}
	]);
})();
