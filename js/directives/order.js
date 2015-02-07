(function() {

	'use strict';

	angular.module('directives.order', [
		'ui.bootstrap',
		'services.global',
		'services.auth',
		'services.order'
	])
	.directive('order', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/order.html',
				controller: [
					'$scope',
					'GlobalService',
					'AuthService',
					'OrderService',
					function($scope, GlobalService, AuthService, OrderService) {
						$scope.branch = GlobalService.Branch();
						$scope.user = AuthService.getUser();
						$scope.myOrder = OrderService.GetOrder();

						$scope.addToOrder = function(product) {
							OrderService.Add(product);
						};

						$scope.removeFromOrder = function(productId) {
							OrderService.Remove(productId);
						};

						$scope.calculateTotal = function() {
							OrderService.CalculateTotal();
						};

						$scope.clear = function() {
							OrderService.Clear();
						};

						$scope.send = function() {
							OrderService.Send();
						};
					}
				]
			};
		}
	]);
})();
