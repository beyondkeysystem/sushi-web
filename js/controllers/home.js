(function() {

	'use strict';
	angular.module('controllers.home', [
		'ngRoute',
		'ui.bootstrap'
	]).controller('HomeController', [
		'$scope',
		'$location',
		'$routeParams',
		function($scope, $location, $routeParams) {
			var _branches = ['funes', 'rosario'];
			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}
			if(angular.isMobile()){
				$location.path('/'+$scope.branch+'/pedidos');
			}
			$scope.page = $location.path().substr($location.path().lastIndexOf('/')+1);
		}
	]);
})();
