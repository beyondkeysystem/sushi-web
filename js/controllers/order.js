(function() {

	'use strict';
	angular.module('controllers.order', [
		'ngRoute',
		'resources.category',
		'resources.product',
		'resources.combo'
	]).controller('OrderController', [
		'$q',
		'$scope',
		'$location',
		'$routeParams',
		'Category',
		'Product',
		'Combo',
		function($q, $scope, $location, $routeParams, Category, Product, Combo) {
			var _branches = ['funes', 'rosario'];

			var _load = function() {
				var pCategory = Category.FetchAll(true).then(function(categories) {
					$scope.allCategories = categories;
				});
				var pProduct = Product.FetchAll(true).then(function(products) {
					$scope.allProducts = products;
				});
				var pCombo = Combo.FetchAll(true).then(function(combos) {
					$scope.allCombos = combos;
				});
				$q.all([pCategory, pProduct, pCombo]).then(function() {
					$scope.loaded = true;
					console.log($scope.allCategories);
					console.log($scope.allProducts);
					console.log($scope.allCombos);
				});
			};

			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}

			$scope.allCategories = [];
			$scope.allProducts = [];
			$scope.allCombos = [];

			_load();

		}
	]);
})();
