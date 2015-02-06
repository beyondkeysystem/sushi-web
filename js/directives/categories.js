(function() {

	'use strict';

	angular.module('directives.categories', [
		'ui.bootstrap',
		'services.global',
		'services.categories',
	])
	.directive('categories', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/categories.html',
				controller: [
					'$scope',
					'$routeParams',
					'GlobalService',
					'CategoriesService',
					function($scope, $routeParams, GlobalService, CategoriesService) {
						$scope.branch = GlobalService.Branch();
						$scope.categories = [];
						$scope.category = CategoriesService.Current($routeParams.category);
						$scope.isCombos = CategoriesService.IsCombos();

						$scope.goToCategory = function(categoryId) {
							CategoriesService.GoTo(categoryId);
						};

						CategoriesService.GetAll().then(function (categories) {
							$scope.categories = categories;
						});
					}
				]
			};
		}
	]);
})();
