/**
 * Extecite when the application is ready
 */
function appReady( cb ) {
	if ( 'loading' !== document.readyState ) {
		cb();
	} else if ( document.addEventListener ) {
		document.addEventListener( 'DOMContentLoaded', cb );
	}
}

export { appReady };
