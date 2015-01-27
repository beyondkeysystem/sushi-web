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
				var pCategory, pProduct, pCombo;
				pCategory = Category.FetchAll();
				if($scope.isCombos){
					pProduct = Combo.FetchAll();
				} else {
					pProduct = Product.FindBy('categoryId', $scope.category);
				}
				$q.all([pCategory, pProduct]).then(function(results) {
					$scope.categories = results[0];
					$scope.products = results[1];
					var i, j, first, count, row, max = 6, columns = 2;
					$scope.loaded = true;
					for (i = $scope.categories.length - 1; i >= 0; i--) {
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
					first = ($scope.page - 1) * max;
					count = 0;
					for (i = first; (i < $scope.products.length) && (count < max); i++, count++) {
						row = Math.floor(count/columns);
						if(!angular.isArray($scope.results[row])){
							$scope.results[row] = [];
						}
						$scope.results[row].push($scope.products[i]);
					}
					console.log($scope.results);
				});
			};

			$scope.categories = [];
			$scope.products = [];
			$scope.combos = [];
			$scope.isMobile = angular.isMobile();
			$scope.branch = '';
			$scope.isCombos = false;
			$scope.category = 1;
			$scope.page = 1;
			$scope.results = [];

			$scope.goToCategory = function(categoryId){
				$location.path('/'+$scope.branch+'/pedidos/categoria/'+categoryId);
			};

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
			if(!$scope.isCombos && (parseInt(_category) < 1 || parseInt(_category) > 8)) {
				$scope.goToCategory(1);
			}

			if(!isNaN($routeParams.page)) {
				$scope.page = parseInt($routeParams.page);
			} else {
				$scope.goToCategory($scope.category);
			}

			_load();

		}
	]);
})();
