(function() {

	'use strict';

	angular.module('services.order', [
		'ngRoute',
		'services.global',
		'services.auth'
	]).factory('OrderService', [
		'$location',
		'GlobalService',
		'AuthService',
		function($location, GlobalService, AuthService) {

			var _order = {
				products: {},
				delivery: false,
				count: 0,
				total: '0.00'
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
				_order.count = 0;
				_order.total = '0.00';
			};

			var _send = function() {
				console.log(_order);
			};

			return {
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
