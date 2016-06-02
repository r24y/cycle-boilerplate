export default class HtmlWidget {
  constructor(html) {
    this.type = 'Widget';
    this.html = html;
  }
  init() {
    this.elem = document.createElement('DIV');
    this.elem.innerHTML = this.html;
    return this.elem;
  }
  update(previous, domNode) {
    this.elem = domNode;
    this.elem.innerHTML = this.html;
  }
  destroy() {
    this.elem = null;
  }
}
