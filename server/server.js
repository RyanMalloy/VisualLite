const express = require("express");
const cors = require("cors");
const neo4j = require("neo4j-driver");
const app = express();
const port = 4000;
const { exec } = require("child_process");
const path = require('path')

app.use(cors());

// Class imports
const Beer = require("./classes/Beer");
const Brewery = require("./classes/Brewery");
const Category = require("./classes/Category");
const Geocode = require("./classes/Geocode");
const Style = require("./classes/Style");
const { stdout } = require("process");

// Load environment variables
require("dotenv").config();

// Neo4j setup using environment variables
const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Endpoint for beers
app.get("/beers", async (req, res) => {
	const method = "getBeers";
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 50;
	const skip = (page - 1) * limit;

	const csprojPath = path.resolve(__dirname, '../Api/Api.csproj');
	const command = `dotnet run --project ${csprojPath} ${method} ${skip} ${limit}`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
		  console.error(`Error executing command: ${error}`);
		  return;
		}
		try {
			const jsonBeers = JSON.parse(stdout);
			const strbeers = jsonBeers.map(jsonBeer => JSON.parse(jsonBeer));
			const beers = [];
			strbeers.forEach(beer => {
				//console.log(`ID: ${beer.id}, Name: ${beer.name}, ABV: ${beer.abv}, Brewery ID: ${beer.breweryID}, Category ID: ${beer.catID}, Style ID: ${beer.styleID}, Description: ${beer.description}`);
				beers.push(new Beer(beer.id, beer.name, beer.abv, beer.breweryID, beer.catID, beer.styleID, beer.description));
			});
			res.json(beers);
		} catch (parseError) {
			console.error("Error fetching beers:", error);
			res.status(500).json({ error: "Error fetching beers" });
		}
	});
});

// Endpoint for styles
app.get("/styles", async (req, res) => {
	const method = "getStyles";
	const csprojPath = path.resolve(__dirname, '../Api/Api.csproj');
	const command = `dotnet run --project ${csprojPath} ${method} 0 50`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
		  console.error(`Error executing command: ${error}`);
		  return;
		}
		try {
			const jsonStyles = JSON.parse(stdout);
			const strStyles = jsonStyles.map(jsonStyle => JSON.parse(jsonStyle));
			const styles = [];
			strStyles.forEach(style => {
				//console.log(`ID: ${style.id}, Name: ${style.name}, CatID: ${style.catID}`);
				styles.push(new Style(style.id, style.name, style.catID));
			});
			res.json(styles);
		} catch (parseError) {
			console.error("Error fetching styles:", error);
			res.status(500).json({ error: "Error fetching styles" });
		}
	});
});

// Endpoint for categories
app.get("/categories", async (req, res) => {
	const method = "getCategories";
	const csprojPath = path.resolve(__dirname, '../Api/Api.csproj');
	const command = `dotnet run --project ${csprojPath} ${method} 0 50`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
		  console.error(`Error executing command: ${error}`);
		  return;
		}
		try {
			const jsonCategories = JSON.parse(stdout);
			const strCategories = jsonCategories.map(jsonCategory => JSON.parse(jsonCategory));
			const categories = [];
			strCategories.forEach(category => {
				//console.log(`ID: ${category.id}, Name: ${category.name}`);
				categories.push(new Category(category.id, category.name));
			});
			res.json(categories);
		} catch (parseError) {
			console.error("Error fetching categories:", error);
			res.status(500).json({ error: "Error fetching categories" });
		}
	});
});

// Endpoint for breweries
app.get("/breweries", async (req, res) => {
	const method = "getBreweries";
	const brewPage = parseInt(req.query.page) || 1;
	const brewLimit = parseInt(req.query.limit) || 50;
	const brewSkip = (brewPage - 1) * brewLimit;

	const csprojPath = path.resolve(__dirname, '../Api/Api.csproj');
	const command = `dotnet run --project ${csprojPath} ${method} ${brewSkip} ${brewLimit}`;

	exec(command, (error, stdout, stderr) => {
		if (error) {
		  console.error(`Error executing command: ${error}`);
		  return;
		}
		try {
			const jsonBreweries = JSON.parse(stdout);
			const strbreweries = jsonBreweries.map(jsonBrewery => JSON.parse(jsonBrewery));
			const breweries = [];
			strbreweries.forEach(brewery => {
				//console.log(`ID: ${beer.id}, Name: ${beer.name}, ABV: ${beer.abv}, Brewery ID: ${beer.breweryID}, Category ID: ${beer.catID}, Style ID: ${beer.styleID}, Description: ${beer.description}`);
				breweries.push(new Brewery(brewery.id, brewery.name, brewery.phone, brewery.address, brewery.city, brewery.state,
					brewery.code, brewery.country, brewery.website, brewery.description));
			});
			res.json(breweries);
		} catch (parseError) {
			console.error("Error fetching beers:", error);
			res.status(500).json({ error: "Error fetching beers" });
		}
	});
});

//Endpoint for filters
app.get("/filter", async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 50;
	const skip = (page - 1) * limit;
	var styleIds = "-1";
	var catIds = "-1";
	if(req.query.styleIds != "") styleIds = req.query.styleIds;
	if(req.query.catIds != "") catIds = req.query.catIds;
	const method = "filter";
	const csprojPath = path.resolve(__dirname, '../Api/Api.csproj');
	const command = `dotnet run --project ${csprojPath} ${method} ${skip} ${limit} ${styleIds} ${catIds}`;
	exec(command, (error, stdout, stderr) => {
		if (error) {
		  console.error(`Error executing command: ${error}`);
		  return;
		}
		try {
			const jsonBeers = JSON.parse(stdout);
			const strbeers = jsonBeers.map(jsonBeer => JSON.parse(jsonBeer));
			const filteredBeers = [];
			strbeers.forEach(beer => {
				filteredBeers.push(new Beer(beer.id, beer.name, beer.abv, beer.breweryID, beer.catID, beer.styleID, beer.description));
			});
			res.json(filteredBeers);
		} catch (parseError) {
			console.error("Error fetching beers:", error);
			res.status(500).json({ error: "Error fetching beers" });
		}
	});
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
