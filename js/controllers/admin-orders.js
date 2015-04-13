(function() {

	'use strict';
	angular.module('controllers.admin-orders', [
		'ngRoute',
		'directives.admin-navbar',
		'services.auth',
		'services.general',
		'resources.order'
	]).controller('AdminOrdersController', [
		'$scope',
		'$http',
		'$timeout',
		'$location',
		'AuthService',
		'GeneralService',
		'Order',
		function($scope, $http, $timeout, $location, AuthService, GS, Order) {

			var _config = GS.GetConfig();

			var _calculateTotal = function() {
				var key, sum = 0;
				for(key in $scope.orderShown.products) {
					sum += parseFloat($scope.orderShown.products[key].price) * parseInt($scope.orderShown.products[key].amount);
				}
				sum += $scope.orderShown.deliveryPrice;
				$scope.orderShown.total = sum.toFixed(2);
				$scope.orderShown.count = Object.keys($scope.orderShown.products).length;
			};

			$scope.results = [];
			$scope.detailsShown = false;
			$scope.orderShown = false;

			$scope.columns = [
				{id: 'name', name: 'Nombre', isEditable: false, type: 'text'},
				{id: 'phone', name: 'Telefono', isEditable: false, type: 'text'},
				{id: 'address', name: 'Direccion', isEditable: false, type: 'text'},
				{id: 'dateFrom', name: 'Fecha', isEditable: false, type: 'text'},
				{id: 'timeRange', name: 'Hora Entrega', isEditable: false, type: 'text'},
				{id: 'deliver', name: 'Delivery', isEditable: false, type: 'text'}
			];

			$scope.showDetails = function (item) {
				_config.loading = true;
				$scope.detailsShown = true;
				$scope.orderShown = item;
				console.log(item.deliver, 'Si')
				if(item.deliver === 'Si') {
					$scope.orderShown.deliveryPrice = parseFloat(_config.deliveryPrice);
				} else {
					$scope.orderShown.deliveryPrice = 0;
				}
				$http.get('/api/v1/order/'+item.id+'/detail').then(function (response) {
					_config.loading = false;
					$scope.orderShown.products = response.data;
					_calculateTotal();
				}, function (error) {
					console.error(error);
					_config.loading = false;
				});
			};

			$scope.closeDetails = function () {
				$scope.detailsShown = false;
				$scope.orderShown = undefined;
			};

			_config.loading = true;

			Order.FetchAll().then(function (results) {
				for (var i = results.length - 1; i >= 0; i--) {
					results[i].timeRange = results[i].timeFrom + ' - ' + results[i].timeTo;
					results[i].deliver = results[i].deliver ? 'Si' : 'No';
				};
				$scope.results = results;
				_config.loading = false;
			}, function (error) {
				console.error(error);
				_config.loading = false;
			});

			$timeout(function () {
				if (!AuthService.isOnline() || !AuthService.isAdmin()) {
					$location.path('/rosario/login');
				}
			});
		}
	]);
})();
