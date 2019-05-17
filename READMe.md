# A11y Skipper Menu

## Usage
If any ID passed into the Skipper.init() object are not present on the current page
they will not show up in the menu.

### Installation
```bash
npm install @barebones/a11y-skipper
```
### JavaScript
```javascript
import Skipper from '@barebones/a11y-skipper';

Skipper.init( {
	targetElement: '#a11y-catcher',
	primary: ['Skip to content', '#main'],
	secondary: ['Skip to search', '#search'],
	menu: [
		{ label: 'Navigation', id: '#nav' },
		{ label: 'Sidebar', id: '#sidebar' },
		{ label: 'Footer', id: '#footer' } // this is not in the HTML, so it won't show up
	],
	open: false // show/hide the menu by default
} );
```

### CSS
```css
@import '@barebones/a11y-skipper';

/* Update the color variables is you want */
:root {
  --c-branding: black;
  --c-branding-inverse: white;
}

/* Add more CSS here if you need to override anything */
```

### HTML
```html
<!--Matches the ID passed into Skipper.init()-->
<div id="a11y-skipper">
	<!--A no-JS fallback skip link-->
	<a href="#main">skip to content</a>
</div>

<!--Matches the secondary string ID passed into Skipper.init()-->
<div id="search">Your search stuff here.</div>

<!--Matches the primary string ID passed into Skipper.init()-->
<div id="main">Your main content here.</div>
