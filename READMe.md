# A11y Skipper Menu

```javascript
import Skipper from '@barebones/a11y-skipper';

Skipper.init( {
	targetElement: '#a11y-skipper',
	mainId: '#main',
	searchId: '#search',
	menu: [
		{ label: 'Footer', id: '#footer' },
		{ label: 'Sidebar', id: '#sidebar' }
	]
} );
```

```css
@import '@barebones/a11y-skipper';
```

```html
<!--Matches the ID passed into Skipper.init()-->
<div id="a11y-skipper">
	<!--A no-JS fallback skip link-->
	<a href="#main">skip to content</a>
</div>

<!--Matches the searchId string passed into Skipper.init()-->
<div id="search">Your search stuff here.</div>

<!--Matches the mainId string passed into Skipper.init()-->
<div id="main">Your main content here.</div>
