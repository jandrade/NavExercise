(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../utils/input":6}],2:[function(require,module,exports){
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
},{"../utils/input":6}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
/**
* @fileOverview Project initialization
*
* @version 1.0
*/
(function(HUGE) {
	'use strict';

	/**
	 * Imports
	 */
	var Drawer = require('./components/drawer'),
		NavbarBuilder = require('./components/navbarBuilder'),
		Navbar = require('./components/navbar'),
		http = require('./utils/http'),
	/**
	 * Project components
	 */
		navbarMenu,
		drawer,
		navbar;

	/**
	 * A Navbar button has been clicked
	 * @param {Boolean} show/hide
	 */
	function menuClicked(show) {
		// show backdrop
		drawer.toggleBackdrop(show);
	}

	/**
	 * Hamburger button has been clicked
	 * @param {Boolean} show/hide
	 */
	function drawerClicked(show) {
		navbar.hideMenu();
	}

	/**
	 * Initialize application
	 * @param  {Array} data - Navigation items
	 */
	function initApp(data) {
		// build navbar
		navbarMenu = new NavbarBuilder('.navbar', data.items);
		// add navbar behaviours
		navbar = new Navbar('.navbar > ul', menuClicked);
		// drawer component
		drawer = new Drawer('.nav-toggle', drawerClicked);
	}

	// load nav data
	http.get('/api/nav.json', initApp);

})(window.HUGE = window.HUGE || {});
},{"./components/drawer":1,"./components/navbar":2,"./components/navbarBuilder":3,"./utils/http":5}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
/**
* @fileOverview Global utilities
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

	// expose module
	module.exports = HUGE.utils;

})(window.HUGE = window.HUGE || {});
},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9odWdlL2NvbXBvbmVudHMvZHJhd2VyLmpzIiwiYXBwL3NjcmlwdHMvaHVnZS9jb21wb25lbnRzL25hdmJhci5qcyIsImFwcC9zY3JpcHRzL2h1Z2UvY29tcG9uZW50cy9uYXZiYXJCdWlsZGVyLmpzIiwiYXBwL3NjcmlwdHMvaHVnZS9tYWluLmpzIiwiYXBwL3NjcmlwdHMvaHVnZS91dGlscy9odHRwLmpzIiwiYXBwL3NjcmlwdHMvaHVnZS91dGlscy9pbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGVPdmVydmlldyBEcmF3ZXIgY29tcG9uZW50XG4gKiBIYW5kbGVzIHRoZSBoYW1idXJnZXIgYnV0dG9uXG4gKlxuICogQHZlcnNpb24gMS4wXG4gKi9cbihmdW5jdGlvbihIVUdFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogaW1wb3J0c1xuXHQgKi9cblx0dmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5wdXQnKTtcblxuXHQvKipcblx0ICogQG5hbWVzcGFjZSBIVUdFLmNvbXBvbmVudHNcblx0ICogQ29tcG9uZW50cyBuYW1lc3BhY2Vcblx0ICovXG5cdEhVR0UuY29tcG9uZW50cyA9IEhVR0UuY29tcG9uZW50cyB8fCB7fTtcblxuXHQvKipcblx0ICogUmVwcmVzZW50cyBhIERyYXdlciBjb21wb25lbnRcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIFRoZSBFbGVtZW50IHNlbGVjdG9yXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGJhY2tkcm9wQ2xpY2tlZCBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiB0aGUgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWRcblx0ICogXG5cdCAqIEByZXR1cm4ge09iamVjdH0gUHVibGljIG1ldGhvZHNcblx0ICovXG5cdEhVR0UuY29tcG9uZW50cy5EcmF3ZXIgPSBmdW5jdGlvbiBEcmF3ZXIoc2VsZWN0b3IsIGJhY2tkcm9wQ2xpY2tlZCkge1xuXG5cdFx0LyoqXG5cdFx0ICogQ29tcG9uZW50IG1haW4gY29udGFpbmVyXG5cdFx0ICogQHR5cGUge0hUTUxFbGVtZW50fVxuXHRcdCAqL1xuXHRcdHZhciBlbGVtZW50LFxuXHRcdC8qKlxuXHRcdCAqIERvY3VtZW50IEJvZHlcblx0XHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdFx0ICovXG5cdFx0XHRib2R5LFxuXHRcdC8qKlxuXHRcdCAqIEJhY2tkcm9wIC8gb3ZlcmxheVxuXHRcdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0XHQgKi9cblx0XHRcdGJhY2tkcm9wLFxuXHRcdC8qKlxuXHRcdCAqIEhlYWRlciBjb250YWluZXJcblx0XHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdFx0ICovXG5cdFx0XHRoZWFkZXIsXG5cdFx0LyoqXG5cdFx0ICogSXMgYnV0dG9uIGNsaWNrZWQ/XG5cdFx0ICogQHR5cGUge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0XHRpc09wZW4gPSBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBDb21wb25lbnQgZGVmYXVsdCBzZXR0aW5nc1xuXHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0XHRTRVRUSU5HUyA9IHtcblx0XHRcdFx0YmFja2Ryb3A6ICcuYmFja2Ryb3AnLFxuXHRcdFx0XHRiYWNrZHJvcE9wZW46ICdtZW51LW9wZW4nLFxuXHRcdFx0XHRoZWFkZXI6ICcuaGVhZGVyJ1xuXHRcdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNob3cvaGlkZSBiYWNrZHJvcFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IHNob3dcblx0XHQgKi9cblx0XHRmdW5jdGlvbiB0b2dnbGVCYWNrZHJvcChzaG93KSB7XG5cdFx0XHRpZiAoc2hvdykge1xuXHRcdFx0XHRib2R5LmNsYXNzTGlzdC5hZGQoU0VUVElOR1MuYmFja2Ryb3BPcGVuKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJvZHkuY2xhc3NMaXN0LnJlbW92ZShTRVRUSU5HUy5iYWNrZHJvcE9wZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHRpc09wZW4gPSBzaG93O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEhhbWJ1cmdlciBidXR0b24gaGFzIGJlZW4gY2xpY2tlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGVsZW1lbnRDbGlja0hhbmRsZXIoZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0b2dnbGVCYWNrZHJvcCghaXNPcGVuKTtcblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBCYWNrZHJvcCBoYXMgYmVlbiBjbGlja2VkXG5cdFx0ICogQGV2ZW50XG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gYmFja2Ryb3BDbGlja0hhbmRsZXIoZSkge1xuXHRcdFx0Ly8gaGlkZSBiYWNrZHJvcFxuXHRcdFx0dG9nZ2xlQmFja2Ryb3AoZmFsc2UpO1xuXHRcdFx0XG5cdFx0XHRpZiAodHlwZW9mIGJhY2tkcm9wQ2xpY2tlZCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRiYWNrZHJvcENsaWNrZWQoaXNPcGVuKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvKipcblx0XHQgKiBIZWFkZXIgaGFzIGJlZW4gY2xpY2tlZFxuXHRcdCAqIEBldmVudFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhlYWRlckNsaWNrSGFuZGxlcihlKSB7XG5cdFx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG5cdFx0XHRcblx0XHRcdGlmICh0YXJnZXQubm9kZU5hbWUgPT09ICdIRUFERVInIHx8IHRhcmdldC5ub2RlTmFtZSA9PT0gJ05BVicpIHtcblx0XHRcdFx0dG9nZ2xlQmFja2Ryb3AoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBjb25zdHJ1Y3RzIEhVR0UuY29tcG9uZW50cy5uYXZiYXJcblx0XHQgKiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb25cblx0XHQgKi9cblx0XHQoZnVuY3Rpb24oKSB7XG5cdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cdFx0XHRiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU0VUVElOR1MuYmFja2Ryb3ApO1xuXHRcdFx0aGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihTRVRUSU5HUy5oZWFkZXIpO1xuXHRcdFx0Ym9keSA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XG5cdFx0XHQvLyBldmVudCBoYW5kbGVyc1xuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFV0aWxzLklucHV0LkNMSUNLLCBlbGVtZW50Q2xpY2tIYW5kbGVyLCB0cnVlKTtcblx0XHRcdGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoVXRpbHMuSW5wdXQuQ0xJQ0ssIGJhY2tkcm9wQ2xpY2tIYW5kbGVyLCB0cnVlKTtcblx0XHRcdGhlYWRlci5hZGRFdmVudExpc3RlbmVyKFV0aWxzLklucHV0LkNMSUNLLCBoZWFkZXJDbGlja0hhbmRsZXIsIHRydWUpO1xuXHRcdH0pKCk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9nZ2xlQmFja2Ryb3A6IHRvZ2dsZUJhY2tkcm9wXG5cdFx0fTtcblx0fTtcblxuXHQvLyBleHBvc2UgbW9kdWxlXG5cdG1vZHVsZS5leHBvcnRzID0gSFVHRS5jb21wb25lbnRzLkRyYXdlcjtcblxufSkod2luZG93LkhVR0UgPSB3aW5kb3cuSFVHRSB8fCB7fSk7IiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IE5hdmlnYXRpb24gY29tcG9uZW50IC0gQmVoYXZpb3Vyc1xuICpcbiAqIEB2ZXJzaW9uIDEuMFxuICovXG4oZnVuY3Rpb24oSFVHRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIGltcG9ydHNcblx0ICovXG5cdHZhciBVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL2lucHV0Jyk7XG5cblx0LyoqXG5cdCAqIEBuYW1lc3BhY2UgSFVHRS5jb21wb25lbnRzXG5cdCAqIENvbXBvbmVudHMgbmFtZXNwYWNlXG5cdCAqL1xuXHRIVUdFLmNvbXBvbmVudHMgPSBIVUdFLmNvbXBvbmVudHMgfHwge307XG5cblx0LyoqXG5cdCAqIFJlcHJlc2VudHMgYSBOYXZiYXIgY29tcG9uZW50XG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBUaGUgbWFpbiBzZWxlY3RvclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZW51Q2xpY2tlZCBDYWxsYmFjayB0byBiZSB0cmlnZ2VyZWQgd2hlbiBhIGJ1dHRvbiBoYXMgYmVlbiBjbGlja2VkXG5cdCAqIFxuXHQgKiBAcmV0dXJuIHtPYmplY3R9IFB1YmxpYyBtZXRob2RzXG5cdCAqL1xuXHRIVUdFLmNvbXBvbmVudHMuTmF2YmFyID0gZnVuY3Rpb24gTmF2YmFyKHNlbGVjdG9yLCBtZW51Q2xpY2tlZCkge1xuXG5cdFx0LyoqXG5cdFx0ICogQ29tcG9uZW50IG1haW4gY29udGFpbmVyXG5cdFx0ICogQHR5cGUge0hUTUxFbGVtZW50fVxuXHRcdCAqL1xuXHRcdHZhciBlbGVtZW50LFxuXHRcdC8qKlxuXHRcdCAqIENvbXBvbmVudCBkZWZhdWx0IHNldHRpbmdzXG5cdFx0ICogQHR5cGUge09iamVjdH1cblx0XHQgKi9cblx0XHRcdFNFVFRJTkdTID0ge1xuXHRcdFx0XHRvcGVuOiAnb3Blbidcblx0XHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDaGVja3MgaWYgdGhlcmUgaXMgYSBzdWJtZW51IG9wZW5lZFxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGhpZGVNZW51KCkge1xuXHRcdFx0dmFyIGN1cnJlbnRNZW51ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIFNFVFRJTkdTLm9wZW4pO1xuXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBhIHN1Ym1lbnUgb3BlbmVkLCB0aGVuIGNsb3NlIGl0XG5cdFx0XHRpZiAoY3VycmVudE1lbnUpIHtcblx0XHRcdFx0Y3VycmVudE1lbnUuY2xhc3NMaXN0LnJlbW92ZShTRVRUSU5HUy5vcGVuKTtcdFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNob3cvaGlkZSBzdWJtZW51XG5cdFx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgLSBUaGUgbWVudSBpdGVtIGNsaWNrZWRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiB0b2dnbGVNZW51KGxpbmspIHtcblx0XHRcdHZhclx0cGFyZW50ID0gbGluay5wYXJlbnROb2RlLFxuXHRcdFx0XHRzdWJtZW51ID0gbGluay5uZXh0RWxlbWVudFNpYmxpbmcsXG5cdFx0XHRcdGhhc1N1Ym1lbnUgPSBmYWxzZSxcblx0XHRcdFx0aXNPcGVuZWQgPSBwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFNFVFRJTkdTLm9wZW4pO1xuXG5cdFx0XHRoaWRlTWVudSgpO1xuXHRcdFx0XG5cdFx0XHQvLyBPbiBjbGljaywgaWYgaXRlbSBjb250YWlucyBvdGhlciBpdGVtcywgU2Vjb25kYXJ5IE5hdmlnYXRpb24gYXBwZWFycyBcblx0XHRcdGlmIChsaW5rLm5vZGVOYW1lID09PSAnQScgJiYgc3VibWVudSkge1xuXHRcdFx0XHRoYXNTdWJtZW51ID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoIWlzT3BlbmVkKSB7XG5cdFx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC50b2dnbGUoU0VUVElOR1Mub3Blbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmICh0eXBlb2YgbWVudUNsaWNrZWQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRtZW51Q2xpY2tlZCghaXNPcGVuZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBoYXNTdWJtZW51O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIE5hdmJhciBsaW5rIGhhcyBiZWVuIGNsaWNrZWRcblx0XHQgKiBAZXZlbnRcblx0XHQgKi9cblx0XHRmdW5jdGlvbiBuYXZiYXJDbGlja0hhbmRsZXIoZSkge1xuXHRcdFx0dmFyIGhhc1N1Ym1lbnUgPSB0b2dnbGVNZW51KGUudGFyZ2V0KTtcblxuXHRcdFx0aWYgKGhhc1N1Ym1lbnUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBjb25zdHJ1Y3RzIEhVR0UuY29tcG9uZW50cy5uYXZiYXJcblx0XHQgKiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb25cblx0XHQgKi9cblx0XHQoZnVuY3Rpb24oKSB7XG5cdFx0XHRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cdFx0XG5cdFx0XHQvLyBldmVudCBoYW5kbGVyc1xuXHRcdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFV0aWxzLklucHV0LkNMSUNLLCBuYXZiYXJDbGlja0hhbmRsZXIsIHRydWUpO1x0XG5cdFx0fSkoKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRoaWRlTWVudTogaGlkZU1lbnUsXG5cdFx0XHR0b2dnbGVNZW51OiB0b2dnbGVNZW51XG5cdFx0fTtcblx0fTtcblxuXHQvLyBleHBvc2UgbW9kdWxlXG5cdG1vZHVsZS5leHBvcnRzID0gSFVHRS5jb21wb25lbnRzLk5hdmJhcjtcblxufSkod2luZG93LkhVR0UgPSB3aW5kb3cuSFVHRSB8fCB7fSk7IiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IE5hdmlnYXRpb24gYnVpbGRlclxuICogQnVpbGRzIGEgbmF2YmFyIG1lbnUgZ2l2ZW4gYSBzZXQgb2YgaXRlbXNcbiAqXG4gKiBAdmVyc2lvbiAxLjBcbiAqL1xuKGZ1bmN0aW9uKEhVR0UpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAbmFtZXNwYWNlIEhVR0UuY29tcG9uZW50c1xuXHQgKiBDb21wb25lbnRzIG5hbWVzcGFjZVxuXHQgKi9cblx0SFVHRS5jb21wb25lbnRzID0gSFVHRS5jb21wb25lbnRzIHx8IHt9O1xuXG5cdC8qKlxuXHQgKiBSZXByZXNlbnRzIGEgTmF2YmFyIEJ1aWxkZXIgY29tcG9uZW50XG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBOYXYgbWVudSB3cmFwcGVyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtcyAtIE5hdmlnYXRpb24gZGF0YVxuXHQgKiBcblx0ICovXG5cdEhVR0UuY29tcG9uZW50cy5OYXZiYXJCdWlsZGVyID0gZnVuY3Rpb24gTmF2YmFyQnVpbGRlcihzZWxlY3RvciwgaXRlbXMpIHtcblxuXHRcdC8qKlxuXHRcdCAqIENvbXBvbmVudCBtYWluIGNvbnRhaW5lclxuXHRcdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0XHQgKi9cblx0XHR2YXIgZWxlbWVudCxcblx0XHQvKipcblx0XHQgKiBDb21wb25lbnQgVGVtcGxhdGVzXG5cdFx0ICogQHR5cGUge09iamVjdH1cblx0XHQgKi9cblx0XHRcdFRFTVBMQVRFUyA9IHtcblx0XHRcdFx0aXRlbTogZnVuY3Rpb24obGFiZWwsIHVybCkge1xuXHRcdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0XHQnPGxpPicsXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArIHVybCArICdcIj4nICsgbGFiZWwgKyAnPC9hPidcblx0XHRcdFx0XHRdLmpvaW4oJ1xcbicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQWRkcyBhIG5ldyBuYXZcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBkYXRhXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gYWRkTWVudShkYXRhKSB7XG5cdFx0XHR2YXIgaSA9IDAsXG5cdFx0XHRcdG51bUl0ZW1zID0gZGF0YS5sZW5ndGgsXG5cdFx0XHRcdGN1cnJlbnQsXG5cdFx0XHRcdGxpc3QgPSAnJztcblxuXHRcdFx0bGlzdCArPSAnPHVsPic7XG5cblx0XHRcdC8vIGxvb3AgaW50byBpdGVtc1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBudW1JdGVtczsgaSsrICkge1xuXHRcdFx0XHRjdXJyZW50ID0gZGF0YVtpXTtcblx0XHRcdFx0Ly8gcG9wdWxhdGUgbGlzdCBpdGVtXG5cdFx0XHRcdGxpc3QgKz0gVEVNUExBVEVTLml0ZW0oY3VycmVudC5sYWJlbCwgY3VycmVudC51cmwpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly8gc3VibWVudVxuXHRcdFx0XHRpZiAoY3VycmVudC5pdGVtcyAmJiBjdXJyZW50Lml0ZW1zLmxlbmd0aCkge1xuXHRcdFx0XHRcdGxpc3QgKz0gYWRkTWVudShjdXJyZW50Lml0ZW1zKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGNsb3NlIGN1cnJlbnQgbWVudSBpdGVtXG5cdFx0XHRcdGxpc3QgKz0gJzwvbGk+Jztcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2xvc2UgY3VycmVudCBtZW51XG5cdFx0XHRsaXN0ICs9ICc8L3VsPic7XG5cdFx0XHRcblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEJ1aWxkIG5hdmlnYXRpb25cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBidWlsZCAoKSB7XG5cdFx0XHR2YXIgbGlzdCA9IGFkZE1lbnUoaXRlbXMpO1xuXG5cdFx0XHRlbGVtZW50LmlubmVySFRNTCA9IGxpc3Q7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQGNvbnN0cnVjdHMgSFVHRS5jb21wb25lbnRzLm5hdmJhckJ1aWxkZXJcblx0XHQgKiBDb21wb25lbnQgaW5pdGlhbGl6YXRpb25cblx0XHQgKi9cblx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG5cdFx0XHRidWlsZCgpO1xuXHRcdH0pKCk7XG5cdH07XG5cblx0Ly8gZXhwb3NlIG1vZHVsZVxuXHRtb2R1bGUuZXhwb3J0cyA9IEhVR0UuY29tcG9uZW50cy5OYXZiYXJCdWlsZGVyO1xuXG59KSh3aW5kb3cuSFVHRSA9IHdpbmRvdy5IVUdFIHx8IHt9KTsiLCIvKipcbiogQGZpbGVPdmVydmlldyBQcm9qZWN0IGluaXRpYWxpemF0aW9uXG4qXG4qIEB2ZXJzaW9uIDEuMFxuKi9cbihmdW5jdGlvbihIVUdFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogSW1wb3J0c1xuXHQgKi9cblx0dmFyIERyYXdlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9kcmF3ZXInKSxcblx0XHROYXZiYXJCdWlsZGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL25hdmJhckJ1aWxkZXInKSxcblx0XHROYXZiYXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbmF2YmFyJyksXG5cdFx0aHR0cCA9IHJlcXVpcmUoJy4vdXRpbHMvaHR0cCcpLFxuXHQvKipcblx0ICogUHJvamVjdCBjb21wb25lbnRzXG5cdCAqL1xuXHRcdG5hdmJhck1lbnUsXG5cdFx0ZHJhd2VyLFxuXHRcdG5hdmJhcjtcblxuXHQvKipcblx0ICogQSBOYXZiYXIgYnV0dG9uIGhhcyBiZWVuIGNsaWNrZWRcblx0ICogQHBhcmFtIHtCb29sZWFufSBzaG93L2hpZGVcblx0ICovXG5cdGZ1bmN0aW9uIG1lbnVDbGlja2VkKHNob3cpIHtcblx0XHQvLyBzaG93IGJhY2tkcm9wXG5cdFx0ZHJhd2VyLnRvZ2dsZUJhY2tkcm9wKHNob3cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbWJ1cmdlciBidXR0b24gaGFzIGJlZW4gY2xpY2tlZFxuXHQgKiBAcGFyYW0ge0Jvb2xlYW59IHNob3cvaGlkZVxuXHQgKi9cblx0ZnVuY3Rpb24gZHJhd2VyQ2xpY2tlZChzaG93KSB7XG5cdFx0bmF2YmFyLmhpZGVNZW51KCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSBhcHBsaWNhdGlvblxuXHQgKiBAcGFyYW0gIHtBcnJheX0gZGF0YSAtIE5hdmlnYXRpb24gaXRlbXNcblx0ICovXG5cdGZ1bmN0aW9uIGluaXRBcHAoZGF0YSkge1xuXHRcdC8vIGJ1aWxkIG5hdmJhclxuXHRcdG5hdmJhck1lbnUgPSBuZXcgTmF2YmFyQnVpbGRlcignLm5hdmJhcicsIGRhdGEuaXRlbXMpO1xuXHRcdC8vIGFkZCBuYXZiYXIgYmVoYXZpb3Vyc1xuXHRcdG5hdmJhciA9IG5ldyBOYXZiYXIoJy5uYXZiYXIgPiB1bCcsIG1lbnVDbGlja2VkKTtcblx0XHQvLyBkcmF3ZXIgY29tcG9uZW50XG5cdFx0ZHJhd2VyID0gbmV3IERyYXdlcignLm5hdi10b2dnbGUnLCBkcmF3ZXJDbGlja2VkKTtcblx0fVxuXG5cdC8vIGxvYWQgbmF2IGRhdGFcblx0aHR0cC5nZXQoJy9hcGkvbmF2Lmpzb24nLCBpbml0QXBwKTtcblxufSkod2luZG93LkhVR0UgPSB3aW5kb3cuSFVHRSB8fCB7fSk7IiwiLyoqXG4qIEBmaWxlT3ZlcnZpZXcgXG4qXG4qIEB2ZXJzaW9uIDEuMFxuKi9cbihmdW5jdGlvbihIVUdFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQG5hbWVzcGFjZSBIVUdFLnV0aWxzXG5cdCAqIFV0aWxzIG5hbWVzcGFjZVxuXHQgKi9cblx0SFVHRS51dGlscyA9IEhVR0UudXRpbHMgfHwge307XG5cblx0LyoqXG5cdCAqIFJlcHJlc2VudHMgYSBodHRwL2FqYXggaGFuZGxlclxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogXG5cdCAqIEByZXR1cm4ge09iamVjdH0gUHVibGljIG1ldGhvZHNcblx0ICovXG5cdEhVR0UudXRpbHMuaHR0cCA9IChmdW5jdGlvbiBodHRwKCkge1xuXG5cdFx0dmFyIGh0dHBSZXF1ZXN0LFxuXHRcdFx0c3VjY2Vzc0ZuLFxuXHRcdFx0ZXJyb3JGbjtcblxuXHRcdGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKCkge1xuXHRcdFx0aWYgKGh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0aWYgKGh0dHBSZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0c3VjY2Vzc0ZuKEpTT04ucGFyc2UoaHR0cFJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXJyb3JGbihodHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGZ1bmN0aW9uIGdldCh1cmwsIHN1Y2Nlc3MsIGVycm9yKSB7XG5cdFx0XHRzdWNjZXNzRm4gPSBzdWNjZXNzIHx8IGZ1bmN0aW9uKCl7fTtcblx0XHRcdGVycm9yRm4gPSBlcnJvciB8fCBmdW5jdGlvbigpe307XG5cblx0XHRcdGh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRodHRwUmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBoYW5kbGVSZXNwb25zZTtcblx0XHRcdGh0dHBSZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHRodHRwUmVxdWVzdC5zZW5kKG51bGwpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRnZXQ6IGdldFxuXHRcdH07XG5cdH0pKCk7XG5cblx0Ly8gZXhwb3NlIG1vZHVsZVxuXHRtb2R1bGUuZXhwb3J0cyA9IEhVR0UudXRpbHMuaHR0cDtcblxufSkod2luZG93LkhVR0UgPSB3aW5kb3cuSFVHRSB8fCB7fSk7IiwiLyoqXG4qIEBmaWxlT3ZlcnZpZXcgR2xvYmFsIHV0aWxpdGllc1xuKlxuKiBAdmVyc2lvbiAxLjBcbiovXG4oZnVuY3Rpb24oSFVHRSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBuYW1lc3BhY2UgSFVHRS51dGlsc1xuXHQgKiBVdGlscyBuYW1lc3BhY2Vcblx0ICovXG5cdEhVR0UudXRpbHMgPSBIVUdFLnV0aWxzIHx8IHt9O1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIHVzZXIgaXMgb24gYSBkZXZpY2Vcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdEhVR0UudXRpbHMudG91Y2ggPSAoZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xuXHR9KSgpO1xuXG5cdC8qKlxuXHQqIERlZmluZSBpbnB1dCBldmVudHMgYmFzZWQgb24gdG91Y2ggc3VwcG9ydFxuXHQqL1xuXHRIVUdFLnV0aWxzLklucHV0ID0gKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBIVUdFLnV0aWxzLnRvdWNoID8ge1xuXHRcdFx0U1RBUlQ6ICd0b3VjaHN0YXJ0Jyxcblx0XHRcdE1PVkU6ICd0b3VjaG1vdmUnLFxuXHRcdFx0RU5EOiAndG91Y2hlbmQnLFxuXHRcdFx0Q0xJQ0s6ICd0b3VjaGVuZCcsXG5cdFx0XHRSRVNJWkU6ICdvcmllbnRhdGlvbmNoYW5nZSdcblx0XHR9IDoge1xuXHRcdFx0U1RBUlQ6ICdtb3VzZWRvd24nLFxuXHRcdFx0TU9WRTogJ21vdXNlbW92ZScsXG5cdFx0XHRFTkQ6ICdtb3VzZXVwJyxcblx0XHRcdENMSUNLOiAnY2xpY2snLFxuXHRcdFx0UkVTSVpFOiAncmVzaXplJ1xuXHRcdH07XG5cdH0pKCk7XG5cblx0Ly8gZXhwb3NlIG1vZHVsZVxuXHRtb2R1bGUuZXhwb3J0cyA9IEhVR0UudXRpbHM7XG5cbn0pKHdpbmRvdy5IVUdFID0gd2luZG93LkhVR0UgfHwge30pOyJdfQ==
