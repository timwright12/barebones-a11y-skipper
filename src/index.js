// CSS imports
import './main.css';

// JS imports
import Skipper from './components/skipper/skipper';

if ( 'object' !== typeof window.Barebones ) {
	window.Barebones = {};
}

window.Barebones.skipper = Skipper;
