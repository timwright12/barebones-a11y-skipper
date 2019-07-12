/**
 * Import
 */
import Skipper from '../../src/index.js';

Skipper.init( {
	targetElement: '#a11y-catcher',
	primary: ['Skip to content', '#main'],
	secondary: ['Skip to search', '#search'],
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' } // this is not in the HTML, so it won't show up
	],
	open: false // show/hide the menu by default.
} );
