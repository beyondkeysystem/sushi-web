(function() {

	'use strict';

	angular.module('controllers.login', [
		'ngRoute',
		'services.auth'
	]).controller('LoginController', [
		'$scope',
		'$location',
		'$routeParams',
		'AuthService',
		function($scope, $location, $routeParams, AuthService) {
			var _branches = ['funes', 'rosario'];
			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}
			if (AuthService.isOnline()) {
				$location.path('/'+$scope.branch+'/pedidos');
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
						$location.path('/'+$scope.branch+'/pedidos');
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
