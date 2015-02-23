(function() {

	'use strict';
	angular.module('controllers.admin', [
		'ngRoute',
		'directives.admin-navbar',
		'services.categories'
	]).controller('AdminController', [
		'$scope',
		'$location',
		'$routeParams',
		'CategoriesService',
		'ProductsService',
		function($scope, $location, $routeParams, CS, PS) {
			var _pages = ['general', 'categorias', 'productos', 'combos', 'ordenes', 'clientes'];

			$scope.page = undefined;
			$scope.results = [];
			$scope.columns = [];
			$scope.categories = [];
			
			if(_pages.indexOf($routeParams.page) >= 0){
				$scope.page = $routeParams.page;
			} else {
				$location.path('/admin/general');
			}

			if($scope.page === 'categorias') {
				CS.GetAll().then(function (categories) {
					$scope.results = categories;
				});
				$scope.columns = CS.GetColumns();
			} else if ($scope.page === 'productos') {
				CS.GetAll().then(function (categories) {
					$scope.categories = categories;
				});
				PS.GetAll().then(function (productos) {
					$scope.results = productos;
				});
				$scope.columns = PS.GetColumns();
			}

			$scope.edit = function (item) {
				item.isEditing = true;
			};

			$scope.save = function (item) {
				item.isEditing = false;
			};

			$scope.cancel = function (item) {
				item.isEditing = false;
			};
		}
	]);
})();
