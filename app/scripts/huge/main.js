/**
* @fileOverview Project initialization
*
* @version 1.0
*/
(function(HUGE) {
	'use strict';

	var drawer,
		navbar;

	function menuClicked() {
		// show backdrop
		drawer.toggleBackdrop(true);
	}

	/**
	 * Hamburger button has been clicked
	 * @param {Boolean} show/hide
	 */
	function drawerClicked(show) {
		navbar.hideMenu();
	}

	// add navbar behaviours
	navbar = new HUGE.components.Navbar('.navbar-menu', menuClicked);
	// drawer component
	drawer = new HUGE.components.Drawer('.nav-toggle', drawerClicked);

})(window.HUGE = window.HUGE || {});