/**
* @fileOverview Test Unit specification for Navbar component
*
* @version 1.0
*
*/
/* globals describe, beforeEach, it, expect, __html__ */
(function() {
	'use strict';

	describe('Navbar:', function() {

		var Navbar, navbar, navbarItem, thirdNavbarItem;

		beforeEach(function() {
			document.body.innerHTML = __html__['test/unit/fixtures/navbar.html'];

			Navbar = require('../../app/scripts/huge/components/navbar');

			navbar = new Navbar('.navbar-menu', function(show) {});

			navbarItem = document.querySelectorAll('.navbar-menu > li')[1].querySelector('a');
			thirdNavbarItem = document.querySelectorAll('.navbar-menu > li')[2].querySelector('a');
		});
		
    	it('Should show a submenu', function () {
    		var submenu = navbarItem.parentNode;
    		navbar.toggleMenu(navbarItem);

			expect(submenu.className).toEqual('open');
		});

		it('Should click on a different nav item', function () {
    		var submenu = thirdNavbarItem.parentNode;
    		// click on a selected item
    		thirdNavbarItem.click();
    		expect(submenu.className).toEqual('open');
		});

		it('Should hide a submenu', function () {
			thirdNavbarItem.click();
    		navbar.hideMenu();
			expect(document.querySelectorAll('.open').length).toBe(0);
		});
	});

})();