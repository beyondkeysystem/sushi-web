(function() {

	'use strict';

	angular.module('services.order', [
		'ngRoute',
		'resources.order',
		'resources.order-item',
		'services.global',
		'services.auth'
	]).factory('OrderService', [
		'$http',
		'$location',
		'GlobalService',
		'AuthService',
		'Order',
		'OrderItem',
		function($http, $location, GlobalService, AuthService, Order, OrderItem) {

			var _order = {
				products: {},
				delivery: false,
				success: false,
				error: false,
				timeRange: undefined,
				count: 0,
				total: '0.00'
			};

			var _getAll = function (response) {
				var i, orders = response.data;
				for (i = orders.length - 1; i >= 0; i--) {
					orders[i].timeRange = orders[i].timeFrom + ' - ' + orders[i].timeTo;
				};
				return orders;
			};

			var _getColumns = function () {
				return [
					{id: 'name', name: 'Nombre', isEditable: false, type: 'text'},
					{id: 'phone', name: 'Telefono', isEditable: false, type: 'text'},
					{id: 'address', name: 'Direccion', isEditable: false, type: 'text'},
					{id: 'dateFrom', name: 'Fecha', isEditable: false, type: 'text'},
					{id: 'timeRange', name: 'Horario', isEditable: false, type: 'text'},
					{id: 'deliver', name: 'Delivery', isEditable: false, type: 'bool'},
					{id: 'src', name: 'Archivo', isEditable: false, type: 'file'}
				]
			};

			var _goToLogin = function() {
				$location.path('/'+GlobalService.Branch()+'/login');
			};

			var _calculateTotal = function() {
				var key, sum = 0;
				for(key in _order.products) {
					sum += _order.products[key].price * _order.products[key].count;
				}
				if(_order.delivery){
					sum += 6; //TODO: use service value
				}
				_order.total = sum.toFixed(2);
				_order.count = Object.keys(_order.products).length;
			};

			var _add = function(product) {
				if(!AuthService.isOnline()) {
					_goToLogin();
					return;
				}
				if(angular.isObject(_order.products[product.id])){
					++_order.products[product.id].count;
				} else {
					_order.products[product.id] = {
						id: product.id,
						count: 1,
						plu: product.plu,
						price: product.price,
						name: product.name
					};
					if(_order.products[product.id].name.length > 23) {
						_order.products[product.id].name = _order.products[product.id].name.substr(0, 20) + '...';
					}
				}
				_calculateTotal();
			};

			var _remove = function(productId) {
				_order.products[productId] = undefined;
				delete _order.products[productId];
				_calculateTotal();
			};

			var _clear = function() {
				_order.products = {};
				_order.delivery = false;
				_order.success = false;
				_order.error = false;
				_order.count = 0;
				_order.total = '0.00';
			};

			var _send = function() {
				var key, user = AuthService.getUser(),
					timeRangeArray = _order.timeRange.split(' - '),
					data = {
						userId: user.id,
						name: user.firstName + ' ' + user.lastName,
						phone: user.phone,
						address: user.address,
						timeFrom: timeRangeArray[0],
						timeTo: timeRangeArray[1],
						paid: 0,
						deliver: _order.delivery ? 1 : 0,
						items: []
					};
				for(key in _order.products) {
					data.items.push({
						productId: _order.products[key].id,
						plu: _order.products[key].plu,
						amount: _order.products[key].count
					});
				}
				_order.success = false;
				_order.error = false;
				//TODO: use new Order() and order.save()
				$http.post('/api/v1/order', data).then(
					function (response) {
						console.log(response);
						_clear();
						_order.success = true;
					},
					function (error) {
						console.error(error);
						_order.error = true;
					}
				);
			};

			return {
				GetAll: function() {
					return $http.get('/api/v1/order').then(_getAll);
				},
				GetColumns: function() {
					return _getColumns();
				},
				GetOrder: function () {
					return _order;
				},
				CalculateTotal: function () {
					_calculateTotal();
				},
				Add: function (product) {
					_add(product);
				},
				Remove: function (productId) {
					_remove(productId);
				},
				Clear: function () {
					_clear();
				},
				Send: function () {
					_send();
				}
			};
		}
	]);
})();
