/**
* @fileOverview Project initialization
*
* @version 1.0
*/
(function(HUGE) {
	'use strict';

	var Drawer = require('./components/drawer'),
		Navbar = require('./components/navbar'),
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

	// add navbar behaviours
	navbar = new Navbar('.navbar-menu', menuClicked);
	// drawer component
	drawer = new Drawer('.nav-toggle', drawerClicked);

})(window.HUGE = window.HUGE || {});