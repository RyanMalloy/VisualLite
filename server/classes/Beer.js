class Beer {
  constructor(id, name, abv, breweryID, catID, styleID, description) {
    this.id = id;
    this.name = name;
    this.abv = abv;
    this.breweryID = breweryID;
    this.catID = catID;
    this.styleID = styleID;
    this.description = description;
  }
  
  toString() {
    return `ID: ${this.id}, Name: ${this.name}, ABV: ${this.abv}, Brewery ID: ${this.breweryID}, Category ID: ${this.catID}, Style ID: ${this.styleID}, Description: ${this.description}`;
  }
}

module.exports = Beer;
