(function() {

	'use strict';

	angular.module('services.validate', [])
	.factory('ValidateService', [
		function() {

			// Regex code is obtained from SO: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime#answer-3143231
			var ISO_DATE_REGEXP = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
			var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
			var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
			var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
			var DATETIMELOCAL_REGEXP = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;
			var WEEK_REGEXP = /^(\d{4})-W(\d\d)$/;
			var MONTH_REGEXP = /^(\d{4})-(\d\d)$/;
			var TIME_REGEXP = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/;

			var _pwdMinLength = 3;
			var _nameMinLength = 3;

			var _notEmpty = function (value) {
				return angular.isString(value) && value.length > 0;
			};

			var _minLength = function (value, min) {
				return angular.isString(value) && value.length >= min;
			};

			var _equal = function (value1, value2) {
				return angular.isDefined(value1) && angular.isDefined(value2) && (value1 === value2);
			};

			var _email = function(value){
				return _notEmpty(value) && EMAIL_REGEXP.test(value);
			};

			var _all = function(data) {
				var key, isInvalid = true, errors = [];
				for(key in data) {
					isInvalid = (key.toLowerCase().indexOf('mail') >= 0 && !_email(data[key])) || //validate email
						(key.toLowerCase().indexOf('name') >= 0 && !_minLength(data[key], _nameMinLength)) || //validate names
						(key === 'password' && !_minLength(data[key], _pwdMinLength)) || //validate password
						(key === 'passwordRepeat' && !_equal(data['password'], data['passwordRepeat'])) || //validate repit password
						!_notEmpty(data[key]); //validate all the rest required
					if(isInvalid){
						errors.push(key);
					}
				}
				return errors;
			};

			return {
				NotEmpty: function (value) {
					return _notEmpty(value);
				},
				MinLength: function (value) {
					return _minLength(value);
				},
				Equal: function (value) {
					return _equal(value);
				},
				Email: function (value) {
					return _email(value);
				},
				All: function (data) {
					return _all(data);
				}
			};
		}
	]);
})();
