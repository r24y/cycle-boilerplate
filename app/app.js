/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'babel-polyfill';

// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./favicon.ico';
import 'file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';

// Import Cycle.js libraries
import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';

// Import history libraries
import { makeHistoryDriver } from '@cycle/history';
import { createHistory } from 'history';

// Import the main component
import main from './main';

// Import all the third party stuff
import FontFaceObserver from 'fontfaceobserver';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
import styles from './app.css';
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.check().then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});

const history = createHistory();
const drivers = {
  DOM: makeDOMDriver('#app'),
  location: makeHistoryDriver(history),
};

Cycle.run(main, drivers);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
