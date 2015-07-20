/**
* @fileOverview Test Unit specification for Navbar component
*
* @version 1.0
*
*/
/* globals describe, beforeEach, afterEach, it, expect, jasmine */
(function() {
	'use strict';

	describe('Utils > http:', function() {

		var http;

		/**
		 * Mock Objects
		 */
		var MOCK = {
			success: {
				'status': 200,
				'responseText': '{"items":[{"label":"Work","url":"#/work","items":[]},{"label":"About","url":"#/about","items":[]}]}'
			},
			error: {
				'status': 404,
				'contentType': 'text/plain',
				'responseText': 'NOT FOUND'
			}
		};

		beforeEach(function() {
			jasmine.Ajax.install();
			http = require('../../app/scripts/huge/utils/http');
		});

		afterEach(function() {
			jasmine.Ajax.uninstall();
		});
		
    	it('Should get the response', function () {
    		var successFn = jasmine.createSpy('success');
    		
    		http.get('data/nav.json', successFn);
    		
    		expect(jasmine.Ajax.requests.mostRecent().url).toBe('data/nav.json');
			expect(successFn).not.toHaveBeenCalled();

			jasmine.Ajax.requests.mostRecent().respondWith(MOCK.success);

			expect(successFn).toHaveBeenCalledWith(JSON.parse(MOCK.success.responseText));
		});

		it('Should return an http error', function () {
    		var successFn = jasmine.createSpy('success'),
    			errorFn = jasmine.createSpy('error');
    		
    		http.get('data/nav.json', successFn, errorFn);
    		
    		expect(errorFn).not.toHaveBeenCalled();

			jasmine.Ajax.requests.mostRecent().respondWith(MOCK.error);

			expect(errorFn).toHaveBeenCalledWith(MOCK.error.responseText);
		});
	});

})();