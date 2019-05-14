/**
 * Set the display property of an element
 */
function setDisplay( obj ) {
	if ( obj ) {
		if ( 'true' === obj.getAttribute( 'aria-hidden' ) ) {
			return obj.style.display = 'none';
		} else {
			return obj.removeAttribute( 'style' );
		}
	}
}

export { setDisplay };
