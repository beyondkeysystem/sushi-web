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

			$scope.results = [];
			$scope.columns = [
				{id: 'name', name: 'Nombre', isEditable: true, type: 'text'},
				{id: 'description', name: 'Descripcion', isEditable: true, type: 'text'},
				{id: 'image', name: 'Imagen', isEditable: true, type: 'image'},
				{id: 'amount1', name: 'Cant', isEditable: true, type: 'int'},
				{id: 'price1', name: 'Prec', isEditable: true, type: 'money'},
				{id: 'amount2', name: 'Cant', isEditable: true, type: 'int'},
				{id: 'price2', name: 'Prec', isEditable: true, type: 'money'},
				{id: 'amount3', name: 'Cant', isEditable: true, type: 'int'},
				{id: 'price3', name: 'Prec', isEditable: true, type: 'money'},
				{id: 'amount4', name: 'Cant', isEditable: true, type: 'int'},
				{id: 'price5', name: 'Prec', isEditable: true, type: 'money'}
			];

			$scope.editList = {};

			$scope.new = {
				isEditing: false,
				text: 'Nuevo Combo',
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
