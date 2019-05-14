/**
 * Make sure an element is in the DOM before creating a link for it
 */
function checkElementId( el ) {
	return document.querySelector( el ) ? true : false;
}

export { checkElementId };
