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
					function($scope) {

					}
				]
			};
		}
	]);
})();
