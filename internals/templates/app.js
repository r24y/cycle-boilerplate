/** @jsx hJSX */
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
import { makeDOMDriver, hJSX } from '@cycle/dom';

// Import history libraries
import { makeHistoryDriver } from '@cycle/history';
import { createHistory } from 'history';

// Import what we need to display the README
import README from '../README.md';
import HtmlWidget from './widgets/HtmlWidget';

// Import all the third party stuff
import FontFaceObserver from 'fontfaceobserver';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
import styles from 'containers/App/styles.css';
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.check().then(() => {
  document.body.classList.add(styles.fontLoaded);
}, () => {
  document.body.classList.remove(styles.fontLoaded);
});


function main(drivers) {
  const node = new HtmlWidget(README);
  return {
    DOM: drivers.DOM.select('input').events('click')
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(toggled =>
        <div>
          <input type="checkbox" /> Toggle me
          <p>{toggled ? 'ON' : 'off'}</p>
          <div>{node}</div>
        </div>
      ),
    history: drivers.DOM.select('input').events('click')
      .map(ev => (ev.target.checked ? '/yes' : '/no'))
      .map(pathname => ({ pathname }))
      .startWith({ pathname: '/no' }),
  };
}

const history = createHistory();
const drivers = {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver(history),
};

Cycle.run(main, drivers);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
