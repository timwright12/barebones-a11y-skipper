import { ESCAPE } from '@barebones/keycodes';
import { checkElementId } from '../../utilities/check-element-id.js';
import { visuallyShow } from '../../utilities/visually-show.js';
import { visuallyHide } from '../../utilities/visually-hide.js';
import { setDisplay } from '../../utilities/set-display.js';

// Object.assign Polyfill
if ( 'function' != typeof Object.assign ) {
	Object.assign = function( target ) {
		'use strict';
		if ( null == target ) {
			throw new TypeError( 'Cannot convert undefined or null to object' );
		}

		target = Object( target );
		for ( var index = 1; index < arguments.length; index++ ) {
			var source = arguments[index];
			if ( null != source ) {
				for ( var key in source ) {
					if ( Object.prototype.hasOwnProperty.call( source, key ) ) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}

/**
 * Skipper class component
 */
class Skipper {

	/**
	 * Constructor function to hold stuff
	 * @param {object} element DOM object
	 */
	constructor( obj ) {

		// Setting the initial state of the menu and dropdown option
		this.state = {
			menuOpen: obj.open,
			dropDownOpen: false
		};

		// check for the main link hash
		const hasMainSkipLink = checkElementId( obj.primary[1] );
		const mainSkipLink = obj.primary.length && hasMainSkipLink ? `
			<li class="a11y-skipper__skips-item">
				<a href="${obj.primary[1]}" class="a11y-skipper__link">${obj.primary[0]}</a>
			</li>` : '';

		// check for the search link hash
		const hasSearchSkipLink = checkElementId( obj.secondary[1] );
		const searchSkipLink = obj.secondary.length && hasSearchSkipLink ? `
			<li class="a11y-skipper__skips-item">
				<a href="${obj.secondary[1]}" class="a11y-skipper__link">${obj.secondary[0]}</a>
			</li>` : '';

		// check for menu object contents, if no menu exists in the DOM, don't output it
		/* eslint-disable indent */
		const menuDropdown = obj.menu ? `
			<div class="a11y-skipper__menu" id="a11y-skipper__menu">
				<button aria-controls="a11y-skipper__dropdown" aria-expanded="false" class="a11y-skipper__dropdown-trigger" id="a11y-skipper__dropdown-trigger" type="button">Page Sections</button>
				<ul aria-hidden="true" class="a11y-skipper__dropdown" id="a11y-skipper__dropdown">

				${obj.menu.map( function( menu ) {
					if( checkElementId( menu.id ) ) {
						return `<li class="a11y-skipper__dropdown-item"><a href="${menu.id}" class="a11y-skipper__dropdown-link">${menu.label}</a></li>`;
					} else {
						return null;
					}
				}.bind( this ) ).join( '' )}

				</ul>
			</div>
		` : '';
		/* eslint-enable indent*/

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
			setDisplay( document.getElementById( 'a11y-skipper__dropdown' ) );
			!obj.open ? visuallyHide( document.getElementById( 'a11y-skipper' ), 'skipper-is-hidden' ) : null;
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

		// Close menu when the close button is clicked
		closeButton.addEventListener( 'click', () => {

			this.closeDropdownMenu( dropdown, dropdownTrigger );

			// Set focus back to the <body> onClose
			document.body.setAttribute( 'tabindex', '-1' );
			document.body.focus();

			visuallyHide( menu, 'skipper-is-hidden' );

			this.state.menuOpen = false;

		} );

		// Closing the menu on ESC
		menu.addEventListener( 'keyup', ( e ) => {
			switch ( e.keyCode ) {
					case ESCAPE:
						e.stopPropagation();
						visuallyHide( menu, 'skipper-is-hidden' );
						this.closeDropdownMenu( dropdown, dropdownTrigger );

						break;
			}

			// Close the dropdown if we're not inside it (open check inside closeDropdownMenu())
			if ( dropdown && 0 === dropdown.querySelectorAll( ':focus' ).length ) {
				this.closeDropdownMenu( dropdown, dropdownTrigger );
				this.state.menuOpen = false;
			}

		} );

		if ( dropdown && dropdownTrigger ) {

			// Closing the dropdown on ESC
			dropdown.addEventListener( 'keyup', ( e ) => {

				e.stopPropagation();

				switch ( e.keyCode ) {
						case ESCAPE:
							this.closeDropdownMenu( dropdown, dropdownTrigger );
							dropdownTrigger.focus();
							break;
				}

			}, false );

			// Toggling the dropdown on trigger clink
			dropdownTrigger.addEventListener( 'click', () => {

				if ( true === this.state.dropDownOpen ) {
					this.closeDropdownMenu( dropdown, dropdownTrigger );
				} else {
					this.openDropdownMenu( dropdown, dropdownTrigger );
					dropdown.querySelector( 'a' ).focus();
				}

				setDisplay( dropdown );

			} );
		}

		// Keyup event to tell when the skipper menu has focus
		document.addEventListener( 'keyup', () => {

			if ( 0 !== menu.querySelectorAll( ':focus' ).length ) {
				visuallyShow( menu, 'skipper-is-hidden' );
				this.state.menuOpen = true;
			} else {
				visuallyHide( menu, 'skipper-is-hidden' );
				this.state.menuOpen = false;
				this.closeDropdownMenu( dropdown, dropdownTrigger );
			}

		} );

		// Close dropDown menu on outside click
		document.addEventListener( 'mouseup', ( e ) => {
			if ( e.target != dropdown && e.target.parentNode != dropdown && this.dropDownOpen ) {
				this.closeDropdownMenu( dropdown, dropdownTrigger );
			}
		} );

	} // handleInitEventBinding()

	/**
	 * Utility to make sure the dropdown closes
	 */
	closeDropdownMenu( dropdown, dropdownTrigger ) {
		if( dropdown ) {
			dropdownTrigger.setAttribute( 'aria-expanded', 'false' );
			dropdown.setAttribute( 'aria-hidden', 'true' );
			setDisplay( dropdown );
			this.state.dropDownOpen = false;
		}
	}

	/**
	 * Utility to make sure the dropdown opens
	 */
	openDropdownMenu( dropdown, dropdownTrigger ) {
		dropdownTrigger.setAttribute( 'aria-expanded', 'true' );
		dropdown.setAttribute( 'aria-hidden', 'false' );
		setDisplay( dropdown );
		this.state.dropDownOpen = true;
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
