(function() {

	'use strict';
	angular.module('controllers.admin-general', [
		'ngRoute',
		'ngNotify',
		'flow',
		'directives.admin-navbar',
		'services.auth',
		'services.general',
		'services.validate',
		'resources.general'
	]).controller('AdminGeneralController', [
		'$scope',
		'$http',
		'$timeout',
		'$location',
		'ngNotify',
		'AuthService',
		'GeneralService',
		'ValidateService',
		'General',
		function($scope, $http, $timeout, $location, ngNotify, AuthService, GS, Validate, General) {

			var _clearErrors = function (item) {
				item.errors = {
					name: undefined,
					value: undefined
				};
			};

			$scope.optionList = {
				funesAmTimeFrom: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
				funesAmTimeTo: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
				funesPmTimeFrom: ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
				funesPmTimeTo: ['20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
				rosarioAmTimeFrom: ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
				rosarioAmTimeTo: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
				rosarioPmTimeFrom: ['16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
				rosarioPmTimeTo: ['20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
				funesOpen: ['Si', 'No'],
				rosarioOpen: ['Si', 'No'],
				showPromo: ['Si', 'No']
			};

			var _validate = function (item) {
				var isValid = true;
				_clearErrors(item);
				if(item.isSelect && !Validate.MinLength(item.value, 1)) {
					item.errors.value = 'Debe seleccionar una opcion';
					isValid = false;
				}
				if(!item.isSelect) {
					if (isNaN(item.value) || item.value < 0) {
						item.errors.value = 'Debe ingresar un numero. Minimo 0.';
						isValid = false;
					} else {
						item.value = parseFloat(item.value).toFixed(2);
					}
				}
				return isValid;
			};

			$scope.results = [];
			$scope.categories = [];
			$scope.columns = GS.GetColumns();

			$scope.editList = {};

			$scope.getHumanReadable = function (text) {
				switch(text) {
					case 'funesAmTimeFrom':
						return 'Funes - Hora Desde (AM)';
					case 'funesAmTimeTo':
						return 'Funes - Hora Hasta (AM)';
					case 'funesPmTimeFrom':
						return 'Funes - Hora Desde (PM)';
					case 'funesPmTimeTo':
						return 'Funes - Hora Hasta (PM)';
					case 'rosarioAmTimeFrom':
						return 'Rosario - Hora Desde (AM)';
					case 'rosarioAmTimeTo':
						return 'Rosario - Hora Hasta (AM)';
					case 'rosarioPmTimeFrom':
						return 'Rosario - Hora Desde (PM)';
					case 'rosarioPmTimeTo':
						return 'Rosario - Hora Hasta (PM)';
					case 'funesOpen':
						return 'Funes Abierto';
					case 'rosarioOpen':
						return 'Rosario Abierto';
					case 'minOrderPrice':
						return 'Precio minimo';
					case 'deliveryPrice':
						return 'Precio delivery';
					case 'showPromo':
						return 'Mostrar Promo';
				}
			};

			$scope.edit = function (item) {
				$scope.editList[item.id] = angular.copy(item);
				item.isEditing = true;
			};

			$scope.save = function (item) {
				if(_validate($scope.editList[item.id])) {
					if(item.isBoolean) {
						$scope.editList[item.id].value = $scope.editList[item.id].value === 'No' ? '0' : '1';
					}
					//TODO: use General.Save
					$http({
						method: 'PUT',
						url: '/api/v1/general/'+item.id,
						data: $scope.editList[item.id],
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(
						function (response) {
							ngNotify.set('El elemento se ha guardado correctamente.', 'success');
							$timeout(function() {
								angular.extend(item, $scope.editList[item.id]);
								if(item.isBoolean) {
									item.value = item.value === '0' ? 'No' : 'Si';
								}
								item.isEditing = false;
								$scope.editList[item.id] = undefined;
								delete $scope.editList[item.id];
							});
						},
						function (error) {
							ngNotify.set('No se puedo guardar el elemento.', 'error');
							console.error(error);
						}
					);
				}
			};

			$scope.cancel = function (item) {
				item.isEditing = false;
				$scope.editList[item.id] = undefined;
				delete $scope.editList[item.id];
			};

			General.FetchAll().then(function (results) {
				var i, isTime, isOpen, isPromo;
				for (i = results.length - 1; i >= 0; i--) {
					isTime = results[i].name.indexOf('Time') >= 0;
					isOpen = results[i].name.indexOf('Open') >= 0;
					isPromo = results[i].name.indexOf('Promo') >= 0;
					results[i].isBoolean = isOpen || isPromo;
					results[i].isSelect = isTime || isOpen || isPromo;
					if(results[i].isBoolean) {
						results[i].value = results[i].value === '0' ? 'No' : 'Si';
					}
				};
				$scope.results = results;
			});

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
