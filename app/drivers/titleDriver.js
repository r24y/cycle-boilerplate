export default function makeTitleDriver() {
  return function TitleDriver(title$) {
    title$.subscribe(text => { document.title = text; });
  };
}
