(function() {

	'use strict';

	angular.module('directives.footer', [
			'ui.bootstrap'
		])
		.directive('footer', [
			function() {
				return {
					restrict: 'A',
					scope: { },
					replace: true,
					transclude: false,
					templateUrl: '/partials/directives/footer.html',
					controller: [
						'$scope',
						function($scope) {
						}
					]
				};
			}
		]);
})();
