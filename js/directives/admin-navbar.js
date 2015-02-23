(function() {

	'use strict';

	angular.module('directives.admin-navbar', [
		'ui.bootstrap'
	])
	.directive('adminNavbar', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/admin-navbar.html',
				controller: [
					'$scope',
					'$routeParams',
					function($scope, $routeParams) {
						var _page = $routeParams.page,
							_pages = [
								'general',
								'categorias',
								'productos',
								'combos',
								'ordenes',
								'clientes'
							];

						$scope.selected = {
							general: false,
							categorias: false,
							productos: false,
							combos: false,
							ordenes: false,
							clientes: false
						};

						if(_pages.indexOf(_page) < 0) {
							_page = 'general';
						}
						$scope.selected[_page] = true;
					}
				]
			};
		}
	]);
})();
