(function() {

	'use strict';

	angular.module('directives.products', [
		'ui.bootstrap',
		'services.global',
		'services.categories',
		'services.products',
	])
	.directive('products', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/products.html',
				controller: [
					'$scope',
					'GlobalService',
					'CategoriesService',
					'ProductsService',
					function($scope, GlobalService, CategoriesService, ProductsService) {
						ProductsService.Clear();
						$scope.branch = GlobalService.Branch();
						$scope.isCombos = CategoriesService.IsCombos();
						$scope.products = [];

						ProductsService.GetCurrent().then(function(products) {
							$scope.products = products;
							console.log($scope.isCombos);
							console.log(products);
						});
					}
				]
			};
		}
	]);
})();
