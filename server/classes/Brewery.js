class Brewery {
  constructor(id, name, address, city, state, code, country, phone, website, description) {
    this.id = id.low;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.code = code ? code.low : code;
    this.country = country;
    this.phone = phone;
    this.website = website;
    this.description = description;
  }

  toString() {
    const stateInfo = this.country === "United States" ? `State: ${this.state}, ` : "";
    return `ID: ${this.id}, Name: ${this.name}, Address: ${this.address}, City: ${this.city}, ${stateInfo}Code: ${this.code}, Country: ${this.country}, Phone: ${this.phone}, Website: ${this.website}, Description: ${this.description}`;
  }
}

module.exports = Brewery;
