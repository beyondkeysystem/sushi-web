(function() {

	'use strict';
	angular.module('controllers.admin', [
		'ngRoute',
		'directives.admin-navbar',
		'services.global',
		'services.auth',
		'services.categories',
		'services.validate'
	]).controller('AdminController', [
		'$scope',
		'$location',
		'$routeParams',
		'GlobalService',
		'AuthService',
		'CategoriesService',
		'ProductsService',
		'ValidateService',
		function($scope, $location, $routeParams, GlobalService, AuthService, CS, PS, Validate) {
			var _pages = ['general', 'categorias', 'productos', 'combos', 'ordenes', 'clientes'],
				_branch = GlobalService.Branch($routeParams.branch, true);
				
			if (!AuthService.isOnline() || !AuthService.isAdmin()) {
				$location.path('/'+$scope.branch+'/pedidos');
				return;
			}

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
