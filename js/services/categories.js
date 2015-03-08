(function() {

	'use strict';

	angular.module('services.categories', [
		'ngRoute',
		'services.global',
		'resources.category'
	]).factory('CategoriesService', [
		'$location',
		'GlobalService',
		'Category',
		function($location, GlobalService, Category) {

			var _category = '1';
			var _isCombos = false;

			var _getAll = function (categories) {
				var i;
				for (i = categories.length - 1; i >= 0; i--) {
					categories[i].order = parseInt(categories[i].order);
					if(categories[i].name.indexOf(' ') >= 0 || categories[i].name.length >= 10) {
						categories[i].isLong = true;
					} else {
						categories[i].isLong = false;
					}
					if(categories[i].id === _category) {
						categories[i].active = true;
					} else {
						categories[i].active = false;
					}
				};
				return categories;
			};

			var _getColumns = function () {
				return [
					{id: 'name', name: 'Nombre', isEditable: true, type: 'text'},
					{id: 'description', name: 'Descripción', isEditable: true, type: 'text'},
					{id: 'image', name: 'Imagen', isEditable: false, type: 'image'}
				]
			};

			var _goTo = function(category) {
				$location.path('/'+GlobalService.Branch()+'/pedidos/categoria/'+category);
			};

			var _setCategory = function(category) {
				_isCombos = false;
				if(category === 'combos') {
					_isCombos = true;
				} else if(!isNaN(category)){
					_category = category;
				} else {
					_category = '1';
				}
				if(!_isCombos && (parseInt(category) < 1 || parseInt(category) > 8)) {
					_goTo(1);
				}
				return _category;
			};

			return {
				Current: function(category) {
					if(angular.isString(category) && category.length > 0) {
						return _setCategory(category);
					} else {
						return _category;
					}
				},
				IsCombos: function() {
					return _isCombos;
				},
				GetAll: function() {
					return Category.FetchAll().then(_getAll);
				},
				GetColumns: function() {
					return _getColumns();
				},
				GetNew: function() {
					//Admin not allowed to add new category
					return new Category();
				},
				GoTo: function(category) {
					_goTo(category);
				}
			};
		}
	]);
})();
