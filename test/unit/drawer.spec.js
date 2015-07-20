/**
* @fileOverview Test Unit specification for drawer component
*
* @version 1.0
*
*/
/* globals describe, beforeEach, it, expect, __html__ */
(function() {
	'use strict';

	describe('Drawer:', function() {

		var Drawer, drawer;

		beforeEach(function() {
			document.body.innerHTML = __html__['test/unit/fixtures/drawer.html'];

			Drawer = require('../../app/scripts/huge/components/drawer');

			drawer = new Drawer('.nav-toggle', function(show) {});
		});
		
    	it('Should show the backdrop element', function () {
    		drawer.toggleBackdrop(true);

			expect(document.body.className).toEqual('menu-open');
		});

		it('Should hide the backdrop element', function () {
    		
    		drawer.toggleBackdrop(false);
			expect(document.body.className).toEqual('');
		});

		it('Should open the backdrop by clicking the hamburger btn', function () {
			document.querySelector('.nav-toggle').click();
			expect(document.body.className).toEqual('menu-open');
		});

		it('Should hide the backdrop by clicking the hamburger btn', function () {
			document.getElementById('header').click();
			expect(document.body.className).toEqual('');
		});

		it('Should hide the backdrop by clicking the backdrop element', function () {
			document.querySelector('.backdrop').click();
			expect(document.body.className).toEqual('');
		});
	});

})();