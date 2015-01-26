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
			var _category = $routeParams.category;

			var _load = function() {
				var pCategory = Category.FetchAll(true).then(function(categories) {
					$scope.categories = categories;
				});
				var pProduct = Product.FetchAll(true).then(function(products) {
					$scope.products = products;
				});
				var pCombo = Combo.FetchAll(true).then(function(combos) {
					$scope.combos = combos;
				});
				$q.all([pCategory, pProduct, pCombo]).then(function() {
					$scope.loaded = true;
					for (var i = $scope.categories.length - 1; i >= 0; i--) {
						if($scope.categories[i].name.indexOf(' ') >= 0 || $scope.categories[i].name.length >= 10) {
							$scope.categories[i].isLong = true;
						} else {
							$scope.categories[i].isLong = false;
						}
						if($scope.categories[i].id === $scope.category) {
							$scope.categories[i].active = true;
						} else {
							$scope.categories[i].active = false;
						}
					};
				});
			};

			$scope.categories = [];
			$scope.products = [];
			$scope.combos = [];
			$scope.isMobile = angular.isMobile();
			$scope.branch = '';
			$scope.isCombos = false;

			if(_branches.indexOf($routeParams.branch) >= 0){
				$scope.branch = $routeParams.branch;
			} else {
				$location.path('/error/404');
			}

			if($routeParams.category === 'combos') {
				$scope.isCombos = true;
			} else if(!isNaN(_category)){
				$scope.category = _category;
			} else {
				$scope.category = 1;
			}

			_load();

		}
	]);
})();
