/**
* @fileOverview Test Unit specification for Navbar Builder component
*
* @version 1.0
*
*/
/* globals describe, beforeEach, it, expect, __html__ */
(function() {
	'use strict';

	describe('Components > Navbar Builder:', function() {

		var NavbarBuilder, navbarBuilder;

		/**
		 * Mocks
		 */
		var MOCK = {
			items: {
			   'items':[
			      {
			         'label':'Work',
			         'url':'#/work',
			         'items':[

			         ]
			      },
			      {
			         'label':'About',
			         'url':'#/about',
			         'items':[
			            {
			               'label':'What we do',
			               'url':'#/about/what-we-do'
			            },
			            {
			               'label':'How we work',
			               'url':'#/about/how-we-work'
			            },
			            {
			               'label':'Leadership',
			               'url':'#/about/leadership'
			            }
			         ]
			      },
			      {
			         'label':'Careers',
			         'url':'#/careers',
			         'items':[
			            {
			               'label':'Client Services',
			               'url':'#/careers/client-services'
			            },
			            {
			               'label':'Creative',
			               'url':'#/careers/creative'
			            },
			            {
			               'label':'Motion & Media',
			               'url':'#/careers/motion-and-media'
			            },
			            {
			               'label':'Operations',
			               'url':'#/careers/operations'
			            },
			            {
			               'label':'People',
			               'url':'#/careers/people'
			            },
			            {
			               'label':'Strategy',
			               'url':'#/careers/strategy'
			            },
			            {
			               'label':'Technology',
			               'url':'#/careers/technology'
			            },
			            {
			               'label':'UX & Product Design',
			               'url':'#/careers/ux-and-product-design'
			            }
			         ]
			      },
			      {
			         'label':'Ideas',
			         'url':'#/ideas',
			         'items':[
			            {
			               'label':'Reports',
			               'url':'#/ideas/reports'
			            },
			            {
			               'label':'Perspectives',
			               'url':'#/ideas/perspectives'
			            },
			            {
			               'label':'Books',
			               'url':'#/ideas/books'
			            },
			            {
			               'label':'Videos',
			               'url':'#/ideas/videos'
			            }
			         ]
			      },
			      {
			         'label':'News',
			         'url':'#/news',
			         'items':[

			         ]
			      },
			      {
			         'label':'Events',
			         'url':'#/events',
			         'items':[

			         ]
			      },
			      {
			         'label':'Contact',
			         'url':'#/contact',
			         'items':[
			            {
			               'label':'Atlanta',
			               'url':'#/contact/atlanta'
			            },
			            {
			               'label':'Brooklyn',
			               'url':'#/contact/brooklyn'
			            },
			            {
			               'label':'DC',
			               'url':'#/contact/dc'
			            },
			            {
			               'label':'London',
			               'url':'#/contact/london'
			            },
			            {
			               'label':'Los Angeles',
			               'url':'#/contact/los-angeles'
			            },
			            {
			               'label':'Portland',
			               'url':'#/contact/portland'
			            },
			            {
			               'label':'Rio',
			               'url':'#/contact/rio'
			            },
			            {
			               'label':'San Francisco',
			               'url':'#/contact/san-francisco'
			            }
			         ]
			      }
			   ]
			}
		};

		beforeEach(function() {
			document.body.innerHTML = __html__['test/unit/fixtures/drawer.html'];

			NavbarBuilder = require('../../app/scripts/huge/components/navbarBuilder');

			navbarBuilder = new NavbarBuilder('.navbar', MOCK.items.items);
		});
		
    	it('Should load 7 primary items', function () {
    		var primaryItems = document.querySelectorAll('.navbar > ul > li');

			expect(primaryItems.length).toEqual(7);
		});
	});

})();