(function() {

	'use strict';

	angular.module('directives.home-slider', [
		'ui.bootstrap',
		'resources.article'
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
					'Article',
					function($scope, Article) {

						$scope.interval = 2500;

						$scope.news = [
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: '/img/slides/0001.jpg',
								order: 0
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: '/img/slides/0002.jpg',
								order: 3
							},
							{
								title: 'Bienvenido New York Roll!',
								description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet.',
								image: '/img/slides/0001.jpg',
								order: 1
							},
							{
								title: 'Lorem ipsum sit amet!',
								description: 'Beatiful flowers in Kolymbari, Crete.Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
								image: '/img/slides/0002.jpg',
								order: 2
							}
						];

						Article.FetchAll().then(function (news) {
							for (var i = news.length - 1; i >= 0; i--) {
								$scope.news[i].title = news[i].title;
								$scope.news[i].description = news[i].description;
								$scope.news[i].image = news[i].image;
							};
						},function (news) {
							console.error(news);
						});
					}
				]
			};
		}
	]);
})();
