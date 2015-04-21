(function() {

	'use strict';

	angular.module('directives.products', [
		'services.global',
		'services.general',
		'services.categories',
		'services.products',
		'services.order'
	])
	.directive('products', [
		function() {
			return {
				restrict: 'A',
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/products.html',
				controller: [
					'$scope',
					'$timeout',
					'GlobalService',
					'GeneralService',
					'CategoriesService',
					'ProductsService',
					'OrderService',
					function($scope, $timeout, GlS, GeS, CS, PS, OS) {

						var _config = GeS.GetConfig();

						PS.Clear();
						$scope.branch = GlS.Branch();
						$scope.isCombos = CS.IsCombos();
						$scope.products = [];
						$scope.isClosed = false;

						$scope.addToOrder = function(product) {
							OS.Add(product);
						};

						_config.loading = true;
						PS.GetCurrent().then(function(products) {
							$scope.products = products;
							_config.loading = false;
						}, function (error) {
							_config.loading = false;
							console.error(error);
						});

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
