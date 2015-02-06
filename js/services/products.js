(function() {

	'use strict';

	angular.module('services.products', [
		'ngRoute',
		'services.global',
		'services.categories',
		'resources.product',
		'resources.combo'
	]).factory('ProductsService', [
		'$location',
		'GlobalService',
		'CategoriesService',
		'Product',
		'Combo',
		function($location, GlobalService, CategoriesService, Product, Combo) {
			var _page = 1;
			var _products = [];

			var _clear = function () {
				_page = 1;
				_products = [];
			};

			var _getCurrent = function () {
				var i, row, 
					max = 6,
					columns = 2,
					results = [],
					first = (_page - 1) * max,
					count = 0;
				for (i = first; (i < _products.length) && (count < max); i++, count++) {
					row = Math.floor(count/columns);
					if(!angular.isArray(results[row])){
						results[row] = [];
					}
					results[row].push(_products[i]);
				}
				return results;
			};

			var _setAll = function (products) {
				_clear();
				_products = products;
				return _getCurrent();
			};

			var _goTo = function(page) {
				var category = CategoriesService.Current(),
					branch = GlobalService.Branch();
				$location.path('/'+branch+'/pedidos/categoria/'+category+'/p/'+page);
			};

			var _setPage = function(page) {
				if(!isNaN(page)){
					_page = page;
				} else {
					_page = 0;
				}
				if(parseInt(page) < 0) {
					_goTo(0);
				}
				return _page;
			};

			return {
				Page: function(page) {
					if(angular.isString(page) && page.length > 0) {
						return _setPage(page);
					} else {
						return _page;
					}
				},
				GetCurrent: function() {
					var results;
					if(_products.length > 0){
						results = _getCurrent();
					} else {
						if(CategoriesService.IsCombos()){
							results = Combo.FetchAll().then(_setAll);
						} else {
							results = Product.FindBy('categoryId', CategoriesService.Current()).then(_setAll);
						}
					}
					return results;
				},
				GoTo: function(page) {
					_goTo(page);
				},
				Clear: function() {
					_clear();
				}
			};
		}
	]);
})();
