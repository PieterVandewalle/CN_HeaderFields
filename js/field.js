export class Field {
  #headerType;
  #name;
  #description;
  #gridArea;
  #color;
  constructor(headerType, name, description, gridArea, color) {
    this.#headerType = headerType;
    this.#name = name;
    this.#description = description;
    this.#gridArea = gridArea;
    this.#color = color;
  }
  get headerType() {
    return this.#headerType;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get gridArea() {
    return this.#gridArea;
  }
  get color() {
    return this.#color;
  }
}
