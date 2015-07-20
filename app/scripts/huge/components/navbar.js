/**
 * @fileOverview Navigation component - Behaviours
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
	 * Represents a Navbar component
	 * @constructor
	 * @param {String} selector - The main selector
	 * @param {Function} menuClicked Callback to be triggered when a button has been clicked
	 * 
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
		 * Show/hide submenu
		 * @param  {HTMLElement} link - The menu item clicked
		 */
		function toggleMenu(link) {
			var	parent = link.parentNode,
				submenu = link.nextElementSibling,
				hasSubmenu = false,
				isOpened = parent.classList.contains(SETTINGS.open);

			hideMenu();
			
			// On click, if item contains other items, Secondary Navigation appears 
			if (link.nodeName === 'A' && submenu) {
				hasSubmenu = true;

				if (!isOpened) {
					parent.classList.toggle(SETTINGS.open);
				}
				
				if (typeof menuClicked === 'function') {
					menuClicked(!isOpened);
				}
			}

			return hasSubmenu;
		}

		/**
		 * Navbar link has been clicked
		 * @event
		 */
		function navbarClickHandler(e) {
			var hasSubmenu = toggleMenu(e.target);

			if (hasSubmenu) {
				e.preventDefault();
			}
		}

		/**
		 * @constructs HUGE.components.navbar
		 * Component initialization
		 */
		(function() {
			element = document.querySelector(selector);
		
			// event handlers
			element.addEventListener(Utils.Input.CLICK, navbarClickHandler, true);	
		})();

		return {
			hideMenu: hideMenu,
			toggleMenu: toggleMenu
		};
	};

	// expose module
	module.exports = HUGE.components.Navbar;

})(window.HUGE = window.HUGE || {});