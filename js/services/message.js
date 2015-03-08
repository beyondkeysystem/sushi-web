(function() {

	'use strict';

	angular.module('services.message', [
		'services.validate'
	]).factory('MessageService', [
		'$http',
		'ValidateService',
		function($http, ValidateService) {

			var _getContactData = function (data) {
				return {
					name: data.name,
					email: data.email,
					message: 'Tel: '+data.phone+'\n'+data.message,
					subject: 'Mensaje de contacto desde la Web'
				};
			};

			var _getFranchisesData = function (data) {
				return {
					name: data.firstName + ' ' + data.lastName,
					email: data.email,
					message: 'Tel: '+data.phone+'\n'+'Ciudad: '+data.city+' - '+data.country+'\n'+data.message,
					subject: 'Solicitud de franquicia desde la Web'
				};
			};

			var _send = function (type, data, errors) {
				var i, key, postData = undefined,
					invalidFields = ValidateService.All(data);
				for (i = 0; i < invalidFields.length; i++) {
					key =invalidFields[i];
					errors[key] = true;
				};
				switch(type) {
					case 'contact':
						postData = _getContactData(data);
						break;
					case 'franchises':
						postData = _getFranchisesData(data);
						break;
				}
				if(!invalidFields.length && postData) {
					//TODO: Start loading spinner
					$http.post('/api/v1/message', postData).then(function(response) {
						//TODO: Close loading spinner
						console.log(response);
					}, function(error) {
						//TODO: Close loading spinner
						console.error(error);
					});
				}
				return !invalidFields.length && postData;
			};

			return {
				Send: function(type, data, errors) {
					return _send(type, data, errors);
				}
			};
		}
	]);
})();
