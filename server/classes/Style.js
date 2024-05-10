class Style {
  constructor(id, name, catid) {
    this.id = id;
    this.name = name;
    this.catID = catid
  }

  toString() {
    return `ID: ${this.id}, Name: ${this.name}, CatID: ${this.catID}`;
  }
}

module.exports = Style;
