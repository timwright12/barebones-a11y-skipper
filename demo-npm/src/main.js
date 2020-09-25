/* eslint-disable no-undef, no-console */
import '@barebones/a11y-skipper';

Barebones.skipper.init( {
	targetElement: '#a11y-catcher',
	primary: ['Skip to content', '#main'],
	secondary: ['Skip to search', '#search'],
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' }
	],
	open: false
} );
