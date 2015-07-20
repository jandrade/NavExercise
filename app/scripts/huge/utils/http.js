/**
* @fileOverview 
*
* @version 1.0
*/
(function(HUGE) {
	'use strict';

	/**
	 * @namespace HUGE.utils
	 * Utils namespace
	 */
	HUGE.utils = HUGE.utils || {};

	/**
	 * Represents a http/ajax handler
	 * @constructor
	 * 
	 * @return {Object} Public methods
	 */
	HUGE.utils.http = (function http() {

		var httpRequest,
			successFn,
			errorFn;

		function handleResponse() {
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					successFn(JSON.parse(httpRequest.responseText));
				} else {
					errorFn(httpRequest.responseText);
				}
			}
		}
		
		function get(url, success, error) {
			successFn = success || function(){};
			errorFn = error || function(){};

			httpRequest = new XMLHttpRequest();
			httpRequest.onreadystatechange = handleResponse;
			httpRequest.open('GET', url, true);
			httpRequest.send(null);
		}

		return {
			get: get
		};
	})();

	// expose module
	module.exports = HUGE.utils.http;

})(window.HUGE = window.HUGE || {});