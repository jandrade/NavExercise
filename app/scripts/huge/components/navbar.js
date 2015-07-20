/**
 * @fileOverview Navigation component - Behaviours
 *
 * @version 1.0
 */
(function(HUGE) {
	'use strict';

	/**
	 * @namespace HUGE.components
	 * Components namespace
	 */
	HUGE.components = HUGE.components || {};

	/**
	 * Represents a Navbar component
	 * @constructor
	 * @return {Object} Public methods
	 */
	HUGE.components.Navbar = function Navbar(selector, menuClicked) {

		/**
		 * Component main container
		 * @type {HTMLElement}
		 */
		var element,
		/**
		 * Component default settings
		 * @type {Object}
		 */
			SETTINGS = {
				open: 'open'
			};

		/**
		 * Checks if there is a submenu opened
		 */
		function hideMenu() {
			var currentMenu = element.querySelector('.' + SETTINGS.open);

			// if there is a submenu opened, then close it
			if (currentMenu) {
				currentMenu.classList.remove(SETTINGS.open);	
			}
		}

		/**
		 * Navbar link has been clicked
		 * @event
		 */
		function navbarClickHandler(e) {
			var link = e.target,
				parent = e.target.parentNode,
				submenu = link.nextElementSibling,
				isOpened = parent.classList.contains(SETTINGS.open);

			hideMenu();
			
			// On click, if item contains other items, Secondary Navigation appears 
			if (link.nodeName === 'A' && submenu && !isOpened) {
				e.preventDefault();
				parent.classList.toggle(SETTINGS.open);

				if (typeof menuClicked === 'function') {
					menuClicked();
				}
			}
		}
		/**
		 * @constructs HUGE.components.navbar
		 * Component initialization
		 */
		(function() {
			element = document.querySelector(selector);
		
			// event handlers
			element.addEventListener(HUGE.utils.Input.CLICK, navbarClickHandler, true);	
		})();

		return {
			hideMenu: hideMenu
		};
	};


})(window.HUGE = window.HUGE || {});