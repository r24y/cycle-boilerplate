export default function intent({ DOM, location }) {
  const click$ = DOM.select('input').events('click')
    .map(ev => ev.target.checked);
  const path$ = location.map(l => Boolean(l.pathname.match(/^\/yes/)));
  const state$ = click$.merge(path$).distinctUntilChanged();
  return { click$, path$, state$ };
}
