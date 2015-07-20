/**
* @fileOverview Navigation component - Behaviours
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
	 * Checks if the user is on a device
	 * @return {Boolean}
	 */
	HUGE.utils.touch = (function() {
		return ('ontouchstart' in window);
	})();

	/**
	* Define input events based on touch support
	*/
	HUGE.utils.Input = (function() {
		return HUGE.utils.touch ? {
			START: 'touchstart',
			MOVE: 'touchmove',
			END: 'touchend',
			CLICK: 'touchend',
			RESIZE: 'orientationchange'
		} : {
			START: 'mousedown',
			MOVE: 'mousemove',
			END: 'mouseup',
			CLICK: 'click',
			RESIZE: 'resize'
		};
	})();

})(window.HUGE = window.HUGE || {});