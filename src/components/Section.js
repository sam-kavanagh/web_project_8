class Section {
  constructor({ items, renderer }, containerselector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerselector);
}

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
