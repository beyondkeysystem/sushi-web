(function() {

	'use strict';

	angular.module('directives.home-slider', [
		'ui.bootstrap'
	])
	.directive('homeSlider', [
		function() {
			return {
				restrict: 'A',
				scope: { },
				replace: true,
				transclude: false,
				templateUrl: '/partials/directives/home-slider.html',
				controller: [
					'$scope',
					function($scope) {

						$scope.interval = 2500;

						$scope.news = [
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: {
									src: '/img/slides/0001.jpg',
									alt: 'Chania'
								},
								active: true
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: {
									src: '/img/slides/0002.jpg',
									alt: 'Flower'
								},
								active: false
							},
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: {
									src: '/img/slides/0001.jpg',
									alt: 'Chania'
								},
								active: false
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: {
									src: '/img/slides/0002.jpg',
									alt: 'Flower'
								},
								active: false
							},
						];

						$scope.next = function() {
							//$scope.carousel('next');
						};
					}
				]
			};
		}
	]);
})();
