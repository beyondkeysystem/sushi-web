(function() {

	'use strict';

	angular.module('directives.navbar', [
			'ui.bootstrap',
			'services.auth'
		])
		.directive('navbar', [
			function() {
				return {
					restrict: 'A',
					scope: { },
					replace: true,
					transclude: false,
					templateUrl: '/partials/directives/navbar.html',
					controller: [
						'$scope',
						'$location',
						'AuthService',
						function($scope, $location, AuthService) {

							$scope.user = AuthService.getUser();
							$scope.menu = {
								home: false,
								map: false,
								franchises: false,
								contact: false
							};

							$scope.logout = function(){
								AuthService.logout().then(function() {
									$location.path('/login');
								});
							};

							$scope.$watch('user.currentPage', function(newPage){
								for(var key in $scope.menu){
									if($scope.menu.hasOwnProperty(key)){
										$scope.menu[key] = false;
									}
								}
								switch (newPage) {
									case 'home':
										$scope.menu['home'] = true;
										break;
									case 'map':
										$scope.menu['map'] = true;
										break;
									case 'franchises':
										$scope.menu['franchises'] = true;
										break;
									case 'contact':
										$scope.menu['contact'] = true;
										break;
								}
							});
						}
					]
				};
			}
		]);
})();
