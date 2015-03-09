(function() {

	'use strict';

	angular.module('directives.order', [
		'services.global',
		'services.general',
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
					'GeneralService',
					'AuthService',
					'OrderService',
					function($scope, GlobalService, GeneralService, AuthService, OrderService) {
						$scope.branch = GlobalService.Branch();
						$scope.user = AuthService.getUser();
						$scope.myOrder = OrderService.GetOrder();
						$scope.config = GeneralService.GetConfig();
						$scope.errors = {
							timeRange: false
						};

						$scope.getTimeRange = function() {
							return GeneralService.GetCurrentTimeRange($scope.branch);
						};

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
							$scope.errors.timeRange = false;
							if($scope.myOrder.timeRange) {
								OrderService.Send();
							} else {
								$scope.errors.timeRange = true;
							}
						};
					}
				]
			};
		}
	]);
})();
