import { setStylesOnElement } from './set-styles.js';

/**
 * Visually hide an element
 */
function visuallyHide( el, className ) {
	el.classList.add( className );

	setStylesOnElement( {
		clip: 'rect(1px, 1px, 1px, 1px)',
		clipPath: 'inset(50%)',
		height: '1px',
		width: '1px',
		overflow: 'hidden',
		position: 'absolute'
	}, el );
}

export { visuallyHide };
