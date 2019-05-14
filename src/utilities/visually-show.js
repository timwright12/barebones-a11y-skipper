/**
 * Visually display an element
 */
function visuallyShow( el, className ) {
	el.classList.remove( className );
	el.removeAttribute( 'style' );
}

export { visuallyShow };
