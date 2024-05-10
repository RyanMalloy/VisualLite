class Category {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  toString() {
    return `ID: ${this.id}, Name: ${this.name}`;
  }
}

module.exports = Category;
