# A11y Skipper Menu

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

![Confirm Successful Build](https://github.com/timwright12/barebones-a11y-skipper/workflows/Confirm%20Successful%20Build/badge.svg)

## Usage

If any ID passed into the Skipper.init() object are not present on the current page
they will not show up in the menu.

### Installation

```bash
npm install @barebones/a11y-skipper --save
```

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
@import url("@barebones/a11y-skipper");

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
