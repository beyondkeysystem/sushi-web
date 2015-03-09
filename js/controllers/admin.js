(function() {

	'use strict';
	angular.module('controllers.admin', [
		'ngRoute',
		'directives.admin-navbar',
		'services.auth',
		'services.general',
		'services.categories',
		'services.products',
		'services.order',
		'services.validate'
	]).controller('AdminController', [
		'$scope',
		'$timeout',
		'$location',
		'$routeParams',
		'AuthService',
		'GeneralService',
		'CategoriesService',
		'ProductsService',
		'OrderService',
		'ValidateService',
		function($scope, $timeout, $location, $routeParams, AuthService, GS, CS, PS, OS, Validate) {
			var _pages = ['general', 'categorias', 'productos', 'combos', 'ordenes', 'clientes'];

			$scope.page = undefined;
			$scope.results = [];
			$scope.columns = [];
			$scope.categories = [];
			$scope.editList = {};
			$scope.new = {
				show: false,
				canDelete: false,
				canEdit: false,
				options: false,
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
			};

			if(_pages.indexOf($routeParams.page) >= 0){
				$scope.page = $routeParams.page;
			} else {
				$location.path('/admin/general');
			}

			if($scope.page === 'general') {
				GS.GetAll().then(function (general) {
					$scope.results = general;
				});
				$scope.columns = GS.GetColumns();
				$scope.new.show = false;
				$scope.new.canDelete = false;
				$scope.new.canEdit = true;
				$scope.new.options = true;
			} else if($scope.page === 'categorias') {
				CS.GetAll().then(function (categories) {
					$scope.results = categories;
				});
				$scope.columns = CS.GetColumns();
				$scope.new.show = false;
				$scope.new.canDelete = false;
				$scope.new.canEdit = true;
				$scope.new.options = true;
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
				$scope.new.canDelete = true;
				$scope.new.canEdit = true;
				$scope.new.options = true;
			} else if ($scope.page === 'ordenes') {
				OS.GetAll().then(function (orders) {
					$scope.results = orders;
				});
				$scope.columns = OS.GetColumns();
				$scope.new.show = false;
				$scope.new.canDelete = false;
				$scope.new.canEdit = false;
				$scope.new.options = false;
			}

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
