(function() {

	'use strict';
	angular.module('controllers.admin-combos', [
		'ngRoute',
		'ngNotify',
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
		'ngNotify',
		'AuthService',
		'GeneralService',
		'ValidateService',
		'Combo',
		function($scope, $http, $timeout, $location, ngNotify, AuthService, GS, Validate, Combo) {

			var _clearErrors = function (combo) {
				combo.errors = {
					name: undefined,
					description: undefined,
					image: undefined,
					amount1: undefined,
					price1: undefined,
					amount2: undefined,
					price2: undefined,
					amount3: undefined,
					price3: undefined,
					amount4: undefined,
					price4: undefined
				};
			};

			var _validate = function (combo) {
				var isValid = true;
				_clearErrors(combo);
				if(!Validate.MinLength(combo.name, 2)) {
					combo.errors.name = 'Min 2 letras';
					isValid = false;
				}
				if(!Validate.MinLength(combo.description, 5)) {
					combo.errors.description = 'Min 5 letras';
					isValid = false;
				}
				if(isNaN(combo.amount1) || combo.amount1 < 1) {
					combo.errors.amount1 = 'Min 1';
					isValid = false;
				} else {
					combo.amount1 = parseInt(combo.amount1);
				}
				if(isNaN(combo.price1) || combo.price1 < 0) {
					combo.errors.price1 = 'Min 0';
					isValid = false;
				} else {
					combo.price1 = parseFloat(combo.price1).toFixed(2);
				}
				if(Validate.NotEmpty(combo.amount1) && Validate.NotEmpty(combo.price1)) { //Cant save amount2 without amount1
					if(Validate.NotEmpty(combo.amount2) || Validate.NotEmpty(combo.price2)) {
						if(!Validate.NotEmpty(combo.amount2) || isNaN(combo.amount2) || parseInt(combo.amount2) < 1) {
							combo.errors.amount2 = 'Min 1';
							isValid = false;
						} else {
							combo.amount2 = parseInt(combo.amount2);
						}
						if(!Validate.NotEmpty(combo.price2) || isNaN(combo.price2) || parseFloat(combo.price2) < 0) {
							combo.errors.price2 = 'Min 0';
							isValid = false;
						} else {
							combo.price2 = parseFloat(combo.price2).toFixed(2);
						}
					}
					if(Validate.NotEmpty(combo.amount2) && Validate.NotEmpty(combo.price2)) { //Cant save amount3 without amount2
						if(Validate.NotEmpty(combo.amount3) || Validate.NotEmpty(combo.price3)) {
							if(!Validate.NotEmpty(combo.amount3) || isNaN(combo.amount3) || parseInt(combo.amount3) < 1) {
								combo.errors.amount3 = 'Min 1';
								isValid = false;
							} else {
								combo.amount3 = parseInt(combo.amount3);
							}
							if(!Validate.NotEmpty(combo.price3) || isNaN(combo.price3) || parseFloat(combo.price3) < 0) {
								combo.errors.price3 = 'Min 0';
								isValid = false;
							} else {
								combo.price3 = parseFloat(combo.price3).toFixed(2);
							}
						}
						if(Validate.NotEmpty(combo.amount3) && Validate.NotEmpty(combo.price3)) { //Cant save amount4 without amount3
							if(Validate.NotEmpty(combo.amount4) || Validate.NotEmpty(combo.price4)) {
								if(!Validate.NotEmpty(combo.amount4) || isNaN(combo.amount4) || parseInt(combo.amount4) < 1) {
									combo.errors.amount4 = 'Min 1';
									isValid = false;
								} else {
									combo.amount4 = parseInt(combo.amount4);
								}
								if(!Validate.NotEmpty(combo.price4) ||isNaN(combo.price4) || parseFloat(combo.price4) < 0) {
									combo.errors.price4 = 'Min 0';
									isValid = false;
								} else {
									combo.price4 = parseFloat(combo.price4).toFixed(2);
								}
							}
						}
					}
				}
				console.log(isValid, combo);
				return isValid;
			};

			$scope.results = [];
			$scope.columns = [
				{id: 'name', name: 'Nombre', isEditable: true, type: 'text', tdClass: 'table-opt-2'},
				{id: 'description', name: 'Descripcion', isEditable: true, type: 'text', tdClass: 'table-opt-min-4'},
				{id: 'image', name: 'Imagen', isEditable: true, type: 'image', tdClass: 'center-image'},
				{id: 'amount1', name: 'Cant1', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price1', name: 'Prec1', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount2', name: 'Cant2', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price2', name: 'Prec2', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount3', name: 'Cant3', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price3', name: 'Prec3', isEditable: true, type: 'money', tdClass: 'table-opt-3'},
				{id: 'amount4', name: 'Cant4', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price4', name: 'Prec4', isEditable: true, type: 'money', tdClass: 'table-opt-3'}
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
				if(_validate($scope.newItem.item)) {
					$scope.newItem.isEditing = false;
					$http({
						method: 'POST',
						url: '/api/v1/combo',
						data: $scope.newItem.item,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(
						function (response) {
							ngNotify.set('El combo se ha guardado correctamente.', 'success');
							$scope.newItem.item = new Combo();
							console.log(response);
						},
						function (error) {
							ngNotify.set('No se puedo guardar el nuevo combo.', 'error');
							console.error(error);
						}
					);
				}
			};

			$scope.cancelNew = function () {
				_clearErrors($scope.newItem.item);
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
