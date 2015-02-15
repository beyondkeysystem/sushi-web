(function() {

	'use strict';
	angular.module('controllers.admin', [
		'ngRoute',
		'directives.admin-navbar'
	]).controller('AdminController', [
		'$scope',
		'$location',
		'$routeParams',
		function($scope, $location, $routeParams) {
			var _pages = ['general', 'categorias', 'productos', 'combos', 'ordenes', 'clientes'];

			$scope.page = undefined;
			
			if(_pages.indexOf($routeParams.page) >= 0){
				$scope.page = $routeParams.page;
			} else {
				$location.path('/admin/general');
			}
		}
	]);
})();
