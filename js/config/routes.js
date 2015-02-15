(function() {

	'use strict';

	angular.module('config.routes', [])
	.provider('Routes', [
		function() {

			var accessLevels = {
				'public': [ ],
				'user': ['user'],
				'admin': ['user', 'admin']
			};

			var routes = [

				/* ***************** Admin ***************** */
				{
					'url': '/admin',
					'template': '/partials/pages/admin.html',
					'controller': 'Admin',
					'roles': accessLevels['admin']
				},
				{
					'url': '/admin/:page',
					'template': '/partials/pages/admin.html',
					'controller': 'Admin',
					'roles': accessLevels['admin']
				},
				/* ***************** Public ***************** */
				{
					'url': '/',
					'template': '/partials/pages/index.html',
					'controller': 'Index',
					'roles': accessLevels['public']
				},
				{
					'url': '/error/:error',
					'template': '/partials/pages/error.html',
					'controller': 'Error',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch',
					'template': '/partials/pages/home.html',
					'controller': 'Home',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/login',
					'template': '/partials/pages/login.html',
					'controller': 'Login',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/logout',
					'template': '/partials/pages/logout.html',
					'controller': 'Logout',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/mapa',
					'template': '/partials/pages/map.html',
					'controller': 'Home',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/franquicias',
					'template': '/partials/pages/franchises.html',
					'controller': 'Home',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/contacto',
					'template': '/partials/pages/contact.html',
					'controller': 'Home',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/pedidos',
					'template': '/partials/pages/order.html',
					'controller': 'Order',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/pedidos/categoria/:category',
					'template': '/partials/pages/order.html',
					'controller': 'Order',
					'roles': accessLevels['public']
				},
				{
					'url': '/:branch/pedidos/categoria/:category/p/:page',
					'template': '/partials/pages/order.html',
					'controller': 'Order',
					'roles': accessLevels['public']
				}
			];

			this.getRoutes = function() {
				return routes;
			};

			this.$get = function() {
				return {
					accessLevels: accessLevels,
					routes: routes
				};
			};
		}
	]);
})();
