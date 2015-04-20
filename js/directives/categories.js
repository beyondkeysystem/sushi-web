(function() {

	'use strict';

	angular.module('directives.categories', [
		'services.global',
		'services.categories',
	])
	.directive('categories', [
		function() {
			return {
				restrict: 'A',
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
						$scope.category = CategoriesService.Current($routeParams.category);
						$scope.isCombos = CategoriesService.IsCombos();
						$scope.categories = [];
						$scope.menuShown = false;

						$scope.toggleMenu = function () {
							$scope.menuShown = !$scope.menuShown;
							console.log($scope.menuShown);
						};

						$scope.goToCategory = function(categoryId) {
							$scope.menuShown = false;
							CategoriesService.GoTo(categoryId);
						};

						CategoriesService.GetAll().then(function(categories) {
							$scope.categories = categories;
						});
					}
				]
			};
		}
	]);
})();
