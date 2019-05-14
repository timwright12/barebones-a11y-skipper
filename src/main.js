/**
 * Import
 */
import Skipper from './components/skipper/skipper';

/**
 * Execute
 */
Skipper.init( {
	targetElement: '#a11y-catcher',
	mainId: '#main',
	searchId: '#search',
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' }
	],
	open: false
} );
