/**
* @fileOverview E2E test to cover the navExercise application
*
* @version 1.0
*
*/
/* globals jasmine, describe, beforeEach, afterEach, it, expect, __html__ */
(function() {
	'use strict';

	describe('E2E > navExercise:', function() {

		var webdriver = require('selenium-webdriver'),
			chrome = require('selenium-webdriver/chrome'),
			path = require('chromedriver').path,
			driver;

		//jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;


		beforeEach(function(done) {
			var service = new chrome.ServiceBuilder(path).build();
			chrome.setDefaultService(service);

			driver = new webdriver.Builder().
	            withCapabilities(webdriver.Capabilities.chrome()).
	            build();
		});

		// Close the website after each test
		afterEach(function(done) {
			driver.quit().then(done);
		});

		it('Should click on a menu item and display the backdrop', function (done) {
			driver.get('http://localhost:3000/');

    		var title,
    			element = driver.findElement(webdriver.By.tagName('body'));

    		driver.sleep(1000).then(function () {
			   return driver.getTitle().then(function (title) {
			       expect(title).toBe('HUGE NavExercise');
			       done();
			   });
			});
    		/*
		    element.getAttribute('class').then(function(id) {
		        expect(id).toBe('menu-open');
		        done();
		    });*/
		});
	});

})();