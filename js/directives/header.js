(function() {

	'use strict';

	angular.module('directives.header', [
			'ui.bootstrap'
		])
		.directive('header', [
			function() {
				return {
					restrict: 'A',
					scope: { },
					replace: true,
					transclude: false,
					templateUrl: '/partials/directives/header.html',
					controller: [
						'$scope',
						function($scope) {
						}
					]
				};
			}
		]);
})();
