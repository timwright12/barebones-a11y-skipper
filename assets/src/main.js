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
		{ label: 'Footer', id: '#footer' },
		{ label: 'Sidebar', id: '#sidebar' }
	],
	open: true
} );
