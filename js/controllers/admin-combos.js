(function() {

	'use strict';
	angular.module('controllers.admin-combos', [
		'ngRoute',
		'directives.admin-navbar',
		'services.auth',
		'services.general',
		'services.validate',
		'resources.combo'
	]).controller('AdminCombosController', [
		'$scope',
		'$http',
		'$timeout',
		'$location',
		'AuthService',
		'GeneralService',
		'ValidateService',
		'Combo',
		function($scope, $http, $timeout, $location, AuthService, GS, Validate, Combo) {

			var _validate = function (combo) {
				var invalids = [];
			};

			$scope.results = [];
			$scope.columns = [
				{id: 'name', name: 'Nombre', isEditable: true, type: 'text', tdClass: 'table-opt-2'},
				{id: 'description', name: 'Descripcion', isEditable: true, type: 'text', tdClass: 'table-opt-min-4'},
				{id: 'image', name: 'Imagen', isEditable: true, type: 'image', tdClass: 'center-image'},
				{id: 'amount1', name: 'Cant', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price1', name: 'Prec', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount2', name: 'Cant', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price2', name: 'Prec', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount3', name: 'Cant', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price3', name: 'Prec', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount4', name: 'Cant', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price5', name: 'Prec', isEditable: true, type: 'money', tdClass: 'table-opt-3'}
			];

			$scope.editList = {};

			$scope.newItem = {
				isEditing: false,
				text: 'Nuevo Combo',
				item: new Combo()
			};

			$scope.uploadImage = function (item) {
				console.log('uploading image for: ', item);
			};

			$scope.addNew = function () {
				$scope.newItem.isEditing = true;
			};

			$scope.saveNew = function () {
				console.log($scope.newItem.item);
				$scope.newItem.isEditing = false;
			};

			$scope.cancelNew = function () {
				$scope.newItem.isEditing = false;
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
				Combo.Save(item).then(
					function (response) {
						console.log(response);
					},
					function (error) {
						console.error(error);
					}
				);
			};

			$scope.cancel = function (item) {
				item.isEditing = false;
				$scope.editList[item.id] = undefined;
				delete $scope.editList[item.id];
			};

			Combo.FetchAll().then(function (combos) {
				$scope.results = combos;
			});

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
