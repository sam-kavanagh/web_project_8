class Section {
  constructor({ items, renderer }, containerselector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerselector);
}

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
