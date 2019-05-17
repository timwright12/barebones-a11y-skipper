/**
 * Import
 */
import Skipper from './components/skipper/skipper';

/**
 * Execute
 */
Skipper.init( {
	targetElement: '#a11y-catcher',
	primary: ['Skip to content', '#main'],
	secondary: ['Skip to search', '#search'],
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' }
	],
	open: true
} );
