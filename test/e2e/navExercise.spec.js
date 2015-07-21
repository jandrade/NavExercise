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

		/**
		 * Imports
		 */
		var webdriver = require('selenium-webdriver'),
			chrome = require('selenium-webdriver/chrome'),
			path = require('chromedriver').path,
			driver;

		
		beforeEach(function(done) {
			var service = new chrome.ServiceBuilder(path).build();
			chrome.setDefaultService(service);

			driver = new webdriver.Builder().
	            withCapabilities(webdriver.Capabilities.chrome()).
	            build();

			driver.get('http://localhost:3000/');
	        done();
		});

		// Close the website after each test
		afterEach(function(done) {
			driver.quit().then(done);
		});

		it('Should click on a menu item and display the backdrop', function (done) {
			
    		var TITLE = 'HUGE NavExercise',
    			element = driver.findElement(webdriver.By.tagName('body')),
    			menuItem = driver.findElement(webdriver.By.css('.navbar > ul > li:nth-child(1) a')),
    			secondMenuItem = driver.findElement(webdriver.By.css('.navbar > ul > li:nth-child(2) a'));

    		// get page title
    		driver.getTitle()
    			.then(function (title) {
    				expect(title).toBe(TITLE);
    				// click on first item of the navigation
					menuItem.click();	
					done();
				});
    			
    		// get window url
			driver.getCurrentUrl().
        		then(function(url) {
        			// validates if the location.hash has been changed
        			expect(/work/.test(url)).toBe(true);
        			// click on first item of the navigation
        			secondMenuItem.click();
        			// checks if the page is displaying the backdrop
        			element.getAttribute('class').then(function(id) {
				    	expect(id).toBe('menu-open');
				        done();
				    });
        		});

		});
	});

})();