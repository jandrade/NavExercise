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
		
		function get(url, success, error) {
			
		}

		return {
			get: get
		};
	})();

	// expose module
	module.exports = HUGE.utils.http;

})(window.HUGE = window.HUGE || {});