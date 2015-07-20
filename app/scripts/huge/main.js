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