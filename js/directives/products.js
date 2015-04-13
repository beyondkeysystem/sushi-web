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
					'GlobalService',
					'GeneralService',
					'CategoriesService',
					'ProductsService',
					'OrderService',
					function($scope, GlobalService, GeneralService, CategoriesService, ProductsService, OrderService) {

						var _config = GeneralService.GetConfig();

						ProductsService.Clear();
						$scope.branch = GlobalService.Branch();
						$scope.isCombos = CategoriesService.IsCombos();
						$scope.products = [];

						$scope.addToOrder = function(product) {
							OrderService.Add(product);
						};

						_config.loading = true;
						ProductsService.GetCurrent().then(function(products) {
							$scope.products = products;
							_config.loading = false;
						}, function (error) {
							_config.loading = false;
							console.error(error);
						});
					}
				]
			};
		}
	]);
})();
