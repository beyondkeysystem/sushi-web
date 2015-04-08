(function() {

	'use strict';
	angular.module('controllers.admin-products', [
		'ngRoute',
		'ngNotify',
		'flow',
		'directives.admin-navbar',
		'services.auth',
		'services.general',
		'services.validate',
		'resources.product'
	]).controller('AdminProductsController', [
		'$scope',
		'$http',
		'$timeout',
		'$location',
		'ngNotify',
		'AuthService',
		'GeneralService',
		'ValidateService',
		'Product',
		function($scope, $http, $timeout, $location, ngNotify, AuthService, GS, Validate, Product) {

			var _clearErrors = function (product) {
				product.errors = {
					name: undefined,
					categoryId: undefined,
					plu: undefined,
					amount: undefined,
					price: undefined
				};
			};

			var _validate = function (product) {
				var isValid = true;
				_clearErrors(product);
				if(!Validate.MinLength(product.name, 2)) {
					product.errors.name = 'Min 2 letras';
					isValid = false;
				}
				if(!Validate.MinLength(product.plu, 5)) {
					product.errors.plu = 'Min 5 numeros';
					isValid = false;
				}
				if(isNaN(product.amount) || product.amount < 1) {
					product.errors.amount = 'Min 1';
					isValid = false;
				} else {
					product.amount = parseInt(product.amount);
				}
				if(isNaN(product.price) || product.price < 0) {
					product.errors.price = 'Min 0';
					isValid = false;
				} else {
					product.price = parseFloat(product.price).toFixed(2);
				}
				return isValid;
			};

			$scope.results = [];
			$scope.columns = [
				{id: 'name', name: 'Nombre', isEditable: true, type: 'text', tdClass: 'table-opt-2'},
				{id: 'categoryId', name: 'Categoria', isEditable: false, type: 'text'},
				{id: 'image', name: 'Imagen', isEditable: true, type: 'image', tdClass: 'center-image'},
				{id: 'plu', name: 'PLU', isEditable: true, type: 'text', tdClass: 'table-opt-2'},
				{id: 'amount', name: 'Cant', isEditable: true, type: 'int', tdClass: 'table-opt-2'},
				{id: 'price', name: 'Prec', isEditable: true, type: 'money', tdClass: 'table-opt-3'}
			];

			$scope.renderUpload = true;
			$scope.showUpload = false;
			$scope.uploadError = false;
			$scope.uploadItem = undefined;

			$scope.editList = {};

			$scope.newItem = {
				isEditing: false,
				text: 'Nuevo Producto',
				item: new Product()
			};

			$scope.startUpload = function (item) {
				$scope.showUpload = true;
				$scope.uploadItem = item;
			};

			$scope.imageAdded = function (image) {
				$scope.uploadError = false;
				if('png' !== image.getExtension()) {
					$scope.uploadError = true;
					return false;
				}
				image.uniqueIdentifier += '--data--products--'+$scope.uploadItem.id;
				return true;
			};

			$scope.successUpload = function () {
				ngNotify.set('La imagen se ha guardado correctamente.', 'success');
				$scope.closeUpload();
			};

			$scope.errorUpload = function () {
				ngNotify.set('La imagen no se ha podido guardar.', 'error');
			};

			$scope.closeUpload = function () {
				$scope.showUpload = false;
				$scope.uploadError = true;
				$scope.uploadItem = undefined;
				$timeout(function () {
					$scope.renderUpload = false;
					$timeout(function () {
						$scope.renderUpload = true;
					}, 100);
				}, 1000);
			};

			$scope.newImage = function () {
				ngNotify.set('Debe guardar el producto y luego abrir el modo edicion para cargar la imagen.', 'error');
			};

			$scope.addNew = function () {
				$scope.newItem.isEditing = true;
			};

			$scope.saveNew = function () {
				if(_validate($scope.newItem.item)) {
					$scope.newItem.isEditing = false;
					//TODO: use Product.Save
					$http({
						method: 'POST',
						url: '/api/v1/product',
						data: $scope.newItem.item,
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(
						function (response) {
							ngNotify.set('El producto se ha guardado correctamente.', 'success');
							$scope.newItem.item.id = response.data.product.id;
							$scope.newItem.item.image = response.data.product.image;
							$timeout(function() {
								$scope.results.push(angular.copy($scope.newItem.item));
								$scope.newItem.item = new Product();
							});
						},
						function (error) {
							ngNotify.set('No se puedo guardar el nuevo producto.', 'error');
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
				if(_validate($scope.editList[item.id])) {
					//TODO: use Product.Save
					$http({
						method: 'PUT',
						url: '/api/v1/product/'+item.id,
						data: $scope.editList[item.id],
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(
						function (response) {
							ngNotify.set('El producto se ha guardado correctamente.', 'success');
							$timeout(function() {
								angular.extend(item, $scope.editList[item.id]);
								console.log(item);
								console.log($scope.editList[item.id]);
								item.isEditing = false;
								$scope.editList[item.id] = undefined;
								delete $scope.editList[item.id];
							});
						},
						function (error) {
							ngNotify.set('No se puedo guardar el nuevo producto.', 'error');
							console.error(error);
						}
					);
				}
			};

			$scope.removeInfo = function () {
				ngNotify.set('Seguro desea eliminar el producto? Haga doble click sobre el boton rojo para eliminar.', 'error');
			};

			$scope.remove = function (item) {
				$http({
					method: 'DELETE',
					url: '/api/v1/product/'+item.id
				}).then(
					function (response) {
						ngNotify.set('El producto se ha eliminado correctamente.', 'success');
						$timeout(function() {
							for (var i = $scope.results.length - 1; i >= 0; i--) {
								if($scope.results[i].id === item.id) {
									$scope.results.splice(i, 1);
									break;
								}
							};
						});
					},
					function (error) {
						ngNotify.set('No se pudo eliminar el producto.', 'error');
						console.error(error);
					}
				);
			};

			$scope.cancel = function (item) {
				item.isEditing = false;
				$scope.editList[item.id] = undefined;
				delete $scope.editList[item.id];
			};

			Product.FetchAll().then(function (products) {
				$scope.results = products;
			});

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
