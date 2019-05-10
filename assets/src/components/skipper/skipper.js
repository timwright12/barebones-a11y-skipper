import { ESCAPE } from '@barebones/keycodes';

/**
 * Skipper class component
 */
class Skipper {

	/**
	 * Constructor function to hold stuff
	 * @param {object} element DOM object
	 */
	constructor( obj ) {

		// check for the main link hash
		const hasMainSkipLink = this.checkElementId( obj.mainId );
		const mainSkipLink = obj.mainId && hasMainSkipLink ? `<li class="a11y-skipper__skips-item"><a href="${obj.mainId}" class="a11y-skipper__link">Skip to content</a></li>` : '';

		// check for the search link hash
		const hasSearchSkipLink = this.checkElementId( obj.searchId );
		const searchSkipLink = obj.searchId && hasSearchSkipLink ? `<li class="a11y-skipper__skips-item"><a href="${obj.searchId}" class="a11y-skipper__link">Skip to search</a></li>` : '';

		// check for menu object contents
		const menuDropdown = obj.menu ? `
			<div class="a11y-skipper__menu" id="a11y-skipper__menu">
			<button aria-controls="a11y-skipper__dropdown" aria-expanded="false" id="a11y-skipper__dropdown-trigger" type="button">Page Sections</button>
			<ul aria-hidden="true" class="a11y-skipper__dropdown" id="a11y-skipper__dropdown">
				${obj.menu.map( menu => `
				<li class="a11y-skipper__dropdown-item">
					<a href="${menu.id}" class="a11y-skipper____dropdown-link">${menu.label}</a>
				</li>` ).join( '' )}
			</ul>
			</div>
		` : '';

		const template = `
			<div class="a11y-skipper" id="a11y-skipper" aria-label="Welcome to the skip menu">
				<div class="a11y-skipper__actions" id="a11y-skipper__actions">
					${menuDropdown}
					<ul class="a11y-skipper__skips">
						${mainSkipLink}
						${searchSkipLink}
					</ul>
				</div>
				<button aria-controls="a11y-skipper" aria-label="close this menu" class="a11y-skipper__close" id="a11y-skipper__close" type="button">
					<svg aria-hidden="true" class="a11y-skipper__icon" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M15.854 12.854L11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.499.499 0 0 0-.707 0L8 5 3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.499.499 0 0 0 0 .707L5 8 .146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.499.499 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.499.499 0 0 0 0-.707z"/></svg>
				</button>
			</div>
		`;

		// Make sure the element is set before adding skipper to the DOM
		if ( obj ) {
			document.querySelector( obj.targetElement ).innerHTML = template;
			this.handleInitEventBinding();
			this.setDisplay( document.getElementById( 'a11y-skipper__dropdown' ) );
			!obj.open ? this.visuallyHide( document.getElementById( 'a11y-skipper' ) ) : null;
		}
	}

	/**
	 * Init event binding for the menu
	 */
	handleInitEventBinding() {
		const menu = document.getElementById( 'a11y-skipper' );
		const dropdownTrigger = document.getElementById( 'a11y-skipper__dropdown-trigger' );
		const dropdown = document.getElementById( 'a11y-skipper__dropdown' );
		const closeButton = document.getElementById( 'a11y-skipper__close' );
		let expandedState, menuState;

		// Keyup event to tell when the skipper menu has focus
		document.addEventListener( 'keyup', () => {
			0 !== menu.querySelectorAll( ':focus' ).length ? this.visuallyShow( menu ) : this.visuallyHide( menu );
		} );

		// Opening and closing the dropdown menu inside skipper
		if ( dropdownTrigger ) {
			dropdownTrigger.addEventListener( 'click', () => {
				expandedState = 'false' === dropdownTrigger.getAttribute( 'aria-expanded' ) ? 'true' : 'false';
				menuState = 'false' === dropdown.getAttribute( 'aria-hidden' ) ? 'true' : 'false';

				dropdownTrigger.setAttribute( 'aria-expanded', expandedState );
				dropdown.setAttribute( 'aria-hidden', menuState );
				this.setDisplay( dropdown );

				// Set focus to the first link
				dropdown.querySelector( 'a' ).focus();
			} );
		}

		// Close menu when the close button is clicked
		closeButton.addEventListener( 'click', () => {

			// Set focus back to the <body> onClose
			document.body.setAttribute( 'tabindex', '-1' );
			document.body.focus();

			this.visuallyHide( menu );

		} );

		// Closing the menu on ESC
		menu.addEventListener( 'keyup', ( e ) => {
			switch ( e.keyCode ) {
					case ESCAPE:
						e.stopPropagation();
						this.visuallyHide( menu );
						break;
			}
		} );

	}

	/**
	 * Set the display property of an element
	 */
	setDisplay( obj ) {
		return 'true' === obj.getAttribute( 'aria-hidden' ) ? obj.style.display = 'none' : obj.removeAttribute( 'style' );
	}

	/**
	 * Visually hide an element
	 */
	visuallyHide( el ) {
		el.classList.add( 'skipper-is-hidden' );

		this.setStylesOnElement( {
			clip: 'rect(1px, 1px, 1px, 1px)',
			clipPath: 'inset(50%)',
			height: '1px',
			width: '1px',
			overflow: 'hidden',
			position: 'absolute'
		}, el );
	}

	/**
	 * Visually display an element
	 */
	visuallyShow( el ) {
		el.classList.remove( 'skipper-is-hidden' );
		el.removeAttribute( 'style' );
	}

	/**
	 * Helping set styles on the skipper element inside a loop
	 */
	setStylesOnElement( styles, element ) {
		Object.assign( element.style, styles );
	}

	/**
	 * Make sure an element is in the DOM before creating a link for it
	 */
	checkElementId( el ) {
		return document.querySelector( el ) ? true : false;
	}

	/**
	 * Init function definition
	 * @param {object} obj object
	 * @returns {object} The element itself
	 */
	static init( obj ) {
		return obj ? new Skipper( obj ) : false;
	}
}

export default Skipper;
