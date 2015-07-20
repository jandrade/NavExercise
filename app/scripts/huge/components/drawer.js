/**
 * @fileOverview Drawer component
 * Handles the hamburger button
 *
 * @version 1.0
 */
(function(HUGE) {
	'use strict';

	/**
	 * imports
	 */
	var Utils = require('../utils/input');

	/**
	 * @namespace HUGE.components
	 * Components namespace
	 */
	HUGE.components = HUGE.components || {};

	/**
	 * Represents a Drawer component
	 * @constructor
	 * @param {String} selector - The Element selector
	 * @param {Function} backdropClicked Callback to be triggered when the button has been clicked
	 * 
	 * @return {Object} Public methods
	 */
	HUGE.components.Drawer = function Drawer(selector, backdropClicked) {

		/**
		 * Component main container
		 * @type {HTMLElement}
		 */
		var element,
		/**
		 * Document Body
		 * @type {HTMLElement}
		 */
			body,
		/**
		 * Backdrop / overlay
		 * @type {HTMLElement}
		 */
			backdrop,
		/**
		 * Header container
		 * @type {HTMLElement}
		 */
			header,
		/**
		 * Is button clicked?
		 * @type {Boolean}
		 */
			isOpen = false,
		/**
		 * Component default settings
		 * @type {Object}
		 */
			SETTINGS = {
				backdrop: '.backdrop',
				backdropOpen: 'menu-open',
				header: '.header'
			};

		/**
		 * Show/hide backdrop
		 * @param  {Boolean} show
		 */
		function toggleBackdrop(show) {
			if (show) {
				body.classList.add(SETTINGS.backdropOpen);
			} else {
				body.classList.remove(SETTINGS.backdropOpen);
			}

			isOpen = show;
		}

		/**
		 * Hamburger button has been clicked
		 * @event
		 */
		function elementClickHandler(e) {
			e.preventDefault();

			toggleBackdrop(!isOpen);
		}

		/**
		 * Backdrop has been clicked
		 * @event
		 */
		function backdropClickHandler(e) {
			// hide backdrop
			toggleBackdrop(false);
			
			if (typeof backdropClicked === 'function') {
				backdropClicked(isOpen);
			}
		}

		/**
		 * Header has been clicked
		 * @event
		 */
		function headerClickHandler(e) {
			var target = e.target;
			
			if (target.nodeName === 'HEADER' || target.nodeName === 'NAV') {
				toggleBackdrop(false);
			}
		}

		/**
		 * @constructs HUGE.components.navbar
		 * Component initialization
		 */
		(function() {
			element = document.querySelector(selector);
			backdrop = document.querySelector(SETTINGS.backdrop);
			header = document.querySelector(SETTINGS.header);
			body = document.body;
		
			// event handlers
			element.addEventListener(Utils.Input.CLICK, elementClickHandler, true);
			backdrop.addEventListener(Utils.Input.CLICK, backdropClickHandler, true);
			header.addEventListener(Utils.Input.CLICK, headerClickHandler, true);
		})();

		return {
			toggleBackdrop: toggleBackdrop
		};
	};

	// expose module
	module.exports = HUGE.components.Drawer;

})(window.HUGE = window.HUGE || {});