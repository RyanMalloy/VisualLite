class Geocode {
  constructor(id, brewery_id, latitude, longitude, accuracy) {
    this.id = id;
    this.brewery_id = brewery_id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.accuracy = accuracy;
  }

  toString() {
    return `ID: ${this.id}, Brewery ID: ${this.brewery_id}, Latitude: ${this.latitude}, Longitude: ${this.longitude}, Accuracy: ${this.accuracy}`;
  }
}

module.exports = Geocode;
