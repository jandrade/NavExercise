/**
 * @fileOverview Navigation builder
 * Builds a navbar menu given a set of items
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
	 * Represents a Navbar Builder component
	 * @constructor
	 * @param {String} selector - Nav menu wrapper
	 * @param {Object} items - Navigation data
	 * 
	 */
	HUGE.components.NavbarBuilder = function NavbarBuilder(selector, items) {

		/**
		 * Component main container
		 * @type {HTMLElement}
		 */
		var element,
		/**
		 * Component Templates
		 * @type {Object}
		 */
			TEMPLATES = {
				item: function(label, url) {
					return [
						'<li>',
							'<a href="' + url + '">' + label + '</a>'
					].join('\n');
				}
			};

		/**
		 * Adds a new nav
		 * @param {Array} data
		 */
		function addMenu(data) {
			var i = 0,
				numItems = data.length,
				current,
				list = '';

			list += '<ul>';

			// loop into items
			for ( i = 0; i < numItems; i++ ) {
				current = data[i];
				// populate list item
				list += TEMPLATES.item(current.label, current.url);
				
				// submenu
				if (current.items && current.items.length) {
					list += addMenu(current.items);
				}

				// close current menu item
				list += '</li>';
			}

			// close current menu
			list += '</ul>';
			
			return list;
		}

		/**
		 * Build navigation
		 */
		function build () {
			var list = addMenu(items);

			element.innerHTML = list;
		}

		/**
		 * @constructs HUGE.components.navbarBuilder
		 * Component initialization
		 */
		(function () {
			element = document.querySelector(selector);

			build();
		})();
	};

	// expose module
	module.exports = HUGE.components.NavbarBuilder;

})(window.HUGE = window.HUGE || {});