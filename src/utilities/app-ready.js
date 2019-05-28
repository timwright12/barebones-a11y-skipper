/**
 * Extecite when the application is ready
 */
 
function appReady( cb ) {
	if (document.readyState !== 'loading') {
		cb();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', cb);
	}
};

export { appReady };
