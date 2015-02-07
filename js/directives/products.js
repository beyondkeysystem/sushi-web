(function() {

	'use strict';

	angular.module('directives.products', [
		'ui.bootstrap',
		'services.global',
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
					'CategoriesService',
					'ProductsService',
					'OrderService',
					function($scope, GlobalService, CategoriesService, ProductsService, OrderService) {
						ProductsService.Clear();
						$scope.branch = GlobalService.Branch();
						$scope.isCombos = CategoriesService.IsCombos();
						$scope.products = [];

						$scope.addToOrder = function(product) {
							OrderService.Add(product);
						};

						ProductsService.GetCurrent().then(function(products) {
							$scope.products = products;
						});
					}
				]
			};
		}
	]);
})();
