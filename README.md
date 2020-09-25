# A11y Skipper Menu

[![Build Status][cli-img]][cli-url]

## Usage

If any ID passed into the Skipper.init() object are not present on the current page
they will not show up in the menu.

### Installation
NPM installation is not currently optimal, but you can manually install it for now by copying the files into your workflow.

<!--
```bash
npm install @barebones/a11y-skipper --save
```
-->
### JavaScript

```javascript
import '@barebones/a11y-skipper';

Barebones.skipper.init( {
	targetElement: '#a11y-catcher',
	primary: ['Skip to content', '#main'],
	secondary: ['Skip to search', '#search'],
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' }
	],
	open: false
} );
```

### CSS

```css
@import '@barebones/a11y-skipper'; /* Note: @barebones needs to be included in the build to polyfill Class and template literals */

/* Update the color variables if you want */
:root {
  --c-a11y-skipper-branding: black;
  --c-a11y-skipper-branding-inverse: white;
}

/* Add more CSS here if you need to override anything */
```

### HTML
```html
<!--Matches the ID passed into Skipper.init()-->
<div id="a11y-catcher">
	<!--A no-JS fallback skip link-->
	<a href="#main">skip to content</a>
</div>

<!--Matches the secondary string ID passed into Skipper.init()-->
<div id="search">Your search stuff here.</div>

<!--Matches the primary string ID passed into Skipper.init()-->
<div id="main">Your main content here.</div>
```

[cli-img]: https://travis-ci.org/timwright12/barebones-a11y-skipper.svg?branch=master
[cli-url]: https://travis-ci.org/timwright12/barebones-a11y-skipper
