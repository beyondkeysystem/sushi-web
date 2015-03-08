(function() {

	'use strict';
	angular.module('controllers.admin', [
		'ngRoute',
		'directives.admin-navbar',
		'services.auth',
		'services.categories',
		'services.validate'
	]).controller('AdminController', [
		'$scope',
		'$timeout',
		'$location',
		'$routeParams',
		'AuthService',
		'CategoriesService',
		'ProductsService',
		'ValidateService',
		function($scope, $timeout, $location, $routeParams, AuthService, CS, PS, Validate) {
			var _pages = ['general', 'categorias', 'productos', 'combos', 'ordenes', 'clientes'];

			$scope.page = undefined;
			$scope.results = [];
			$scope.columns = [];
			$scope.categories = [];
			$scope.editList = {};
			$scope.new = {
				show: false,
				isEditing: false,
				text: '',
				item: {}
			};

			$scope.new = function () {
				$scope.new.isEditing = true;
			};

			$scope.saveNew = function () {
				$scope.new.isEditing = false;
			};

			$scope.cancelNew = function () {
				$scope.new.isEditing = false;
			};

			$scope.edit = function (item) {
				$scope.editList[item.id] = angular.copy(item);
				item.isEditing = true;
			};

			$scope.save = function (item) {
				angular.copy($scope.editList[item.id], item);
				item.isEditing = false;
				$scope.editList[item.id] = undefined;
				delete $scope.editList[item.id];
				item.Save();
			};

			$scope.cancel = function (item) {
				item.isEditing = false;
				$scope.editList[item.id] = undefined;
				delete $scope.editList[item.id];
				console.log('Cancel', item);
			};

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
				$scope.new.show = false;
				$scope.new.text = '';
				$scope.new.item = CS.GetNew();
			} else if ($scope.page === 'productos') {
				CS.GetAll().then(function (categories) {
					$scope.categories = categories;
				});
				PS.GetAll().then(function (productos) {
					$scope.results = productos;
				});
				$scope.columns = PS.GetColumns();
				$scope.new.show = true;
				$scope.new.text = 'Nuevo Producto';
				$scope.new.item = PS.GetNew();
			}

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
