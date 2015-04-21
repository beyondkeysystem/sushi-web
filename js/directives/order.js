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
					'$timeout',
					'GlobalService',
					'GeneralService',
					'AuthService',
					'OrderService',
					function($scope, $timeout, GlS, GeS, AuthService, OrderService) {
						$scope.branch = GlS.Branch();
						$scope.user = AuthService.getUser();
						$scope.myOrder = OrderService.GetOrder();
						$scope.config = GeS.GetConfig();
						$scope.isClosed = false;
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

						$timeout(function () {
							if ($scope.branch === 'rosario' && !$scope.config.rosarioOpen) {
								$scope.isClosed = true;
							} else if ($scope.branch === 'funes' && !$scope.config.funesOpen) {
								$scope.isClosed = true;
							}
						}, 300);
					}
				]
			};
		}
	]);
})();
