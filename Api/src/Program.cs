using Neo4j.Driver;
using System.Text.Json;

namespace ConnectToNeo4j
{
    public class Neo4jConnection : IDisposable
    {
        private readonly IDriver _driver;

        public Neo4jConnection(string uri, string username, string password)
        {
            _driver = GraphDatabase.Driver(new Uri(uri), AuthTokens.Basic(username, password));
        }

        public async Task RunQueryAsync(string query, Action<INode> processNode)
        {
            using (var session = _driver.AsyncSession())
            {
                var result = await session.RunAsync(query);

                await result.ForEachAsync(record =>
                {
                    var node = record[0].As<INode>();
                    processNode?.Invoke(node);
                });
            }
        }

        public void Dispose()
        {
            _driver?.Dispose();
        }
    }

    public class Program
    {
        public static async Task<string> createBeerDescription(Neo4jConnection connector, Beer beer)
        {
            return $@"Discover {beer.name}, a remarkable brew with an ABV of {beer.abv}%. " +
                $@"{await getDescStyle(connector, beer.styleID)}, {beer.name} " +
                "offers a harmonious blend of strength and flavor. Perfect for both enthusiasts and " +
                $@"casual drinkers, {beer.name} is an inviting choice for anyone seeking a memorable beer experience.";
        }

        public static string createBreweryDescription(Neo4jConnection connector, Brewery brewery) {
            string strAddress = brewery.address == "" ? "" : $@"{brewery.address}";
            string strCity = brewery.city == "" ? "" : $@", {brewery.city}";
            string strState = brewery.state == "" ? "" : $@", {brewery.state}";
            string strPhone = brewery.phone == "000-000-0000" ? "" : $@"Contact us at {brewery.phone} for more information";
            string strWeb = brewery.website == "" ? "." : $@" or visit us at {brewery.website}.";
            return $@"Explore the distinctive craft of {brewery.name}, located in the heart of {strAddress}" +
                $@"{strCity}{strState}, {brewery.country}. Known for its unique blend of tradition " +
                $@"and innovation, {brewery.name} offers a diverse array of flavors and experiences. Whether you're " +
                $@"a local or just passing through, {brewery.name} welcomes all beer enthusiasts and casual visitors " + 
                $@"alike to enjoy the rich tastes and relaxed atmosphere. {strPhone}{strWeb}";
        }

        public static async Task<string> getDescStyle(Neo4jConnection connector, int styleId) {
            string name = "This beer doesn't fit into any predefined styles";
            await connector.RunQueryAsync($@"
                MATCH (Style:Styles)
                WHERE Style.id = {styleId}
                RETURN Style", node => {                   
                name = "Under the \"" + node.Properties["style_name"].ToString() + "\" style";
            });
            return name;
        }

        public static Brewery populateBrewery(Brewery myBrewery, INode node) {
            Brewery ret = myBrewery;
            ret.address = node.Properties.ContainsKey("address1") ?
                node.Properties["address1"].ToString() : "";
            ret.phone = node.Properties.ContainsKey("phone") ?
                node.Properties["phone"].ToString() : "";
            ret.city = node.Properties.ContainsKey("city") ?
                node.Properties["city"].ToString() : "";
            ret.state = node.Properties.ContainsKey("state") ?
                node.Properties["state"].ToString() : "";
            ret.code = node.Properties.ContainsKey("code") ?
                Convert.ToInt32(node.Properties["code"]) : -1;
            ret.website = node.Properties.ContainsKey("website") ?
                node.Properties["website"].ToString() : "";
            return ret;
        }

        public static async Task getBeers(Neo4jConnection connector, int skip, int limit)
        {
            List<Beer> beers = new List<Beer>();
            var beerQuery = $@"
                MATCH (Beer:Beers)
                RETURN Beer
                SKIP {skip} LIMIT {limit}
            ";
            await connector.RunQueryAsync(beerQuery, node =>
            {                   
                var myBeer = new ConnectToNeo4j.Beer(
                    Id: Convert.ToInt32(node.Properties["id"]),
                    Name: node.Properties["name"].ToString(),
                    Abv: Convert.ToDouble(node.Properties["abv"]),
                    breweryId: Convert.ToInt32(node.Properties["brewery_id"]),
                    catId: Convert.ToInt32(node.Properties["cat_id"]),
                    styleId: Convert.ToInt32(node.Properties["style_id"]),
                    descript: "temp"
                );

                myBeer.description = node.Properties.ContainsKey("descript") ?
                    node.Properties["descript"].ToString() : createBeerDescription(connector, myBeer).Result;
                //Console.WriteLine(myBeer.ToString());
                //Console.WriteLine();
                beers.Add(new Beer(myBeer.id, myBeer.name, myBeer.abv, myBeer.breweryID,
                    myBeer.catID, myBeer.styleID, myBeer.description));
            });

            List<string> jsonBeers = new List<string>();
            foreach (var beer in beers)
            {
                string jsonBeer = JsonSerializer.Serialize(beer);
                jsonBeers.Add(jsonBeer);
            }
            string jsonString = JsonSerializer.Serialize(jsonBeers);
            Console.WriteLine(jsonString);
        }

        public static async Task getStyles(Neo4jConnection connector)
        {
            List<Style> styles = new List<Style>();
            var styleQuery = $@"
                MATCH (Style:Styles)
                RETURN Style";
            await connector.RunQueryAsync(styleQuery, node =>
            {                   
                var myStyle = new Style(
                    ID: Convert.ToInt32(node.Properties["id"]),
                    Name: node.Properties["style_name"].ToString(),
                    catId: Convert.ToInt32(node.Properties["cat_id"])
                );
                styles.Add(new Style(myStyle.id, myStyle.name, myStyle.catID));
            });

            List<string> jsonStyles = new List<string>();
            foreach (var style in styles)
            {
                string jsonStyle = JsonSerializer.Serialize(style);
                jsonStyles.Add(jsonStyle);
            }
            string jsonString = JsonSerializer.Serialize(jsonStyles);
            Console.WriteLine(jsonString);
        }

        public static async Task getCategories(Neo4jConnection connector)
        {
            List<Category> categories = new List<Category>();
            var categoryQuery = $@"
                MATCH (Category:Categories)
                RETURN Category";
            await connector.RunQueryAsync(categoryQuery, node =>
            {                   
                var myCategory = new Category(
                    ID: Convert.ToInt32(node.Properties["id"]),
                    Name: node.Properties["cat_name"].ToString()
                );
                //Console.WriteLine(myCategory.ToString());
                //Console.WriteLine();
                categories.Add(new Category(myCategory.id, myCategory.name));
            });

            List<string> jsonCategories = new List<string>();
            foreach (var category in categories)
            {
                string jsonCategory = JsonSerializer.Serialize(category);
                jsonCategories.Add(jsonCategory);
            }
            string jsonString = JsonSerializer.Serialize(jsonCategories);
            Console.WriteLine(jsonString);
        }

        public static async Task getBreweries(Neo4jConnection connector, int skip, int limit)
        {
            List<Brewery> breweries = new List<Brewery>();
            var breweryQuery = $@"
                MATCH (Brewery:Breweries)
                RETURN Brewery
                SKIP {skip} LIMIT {limit}
            ";
            await connector.RunQueryAsync(breweryQuery, node =>
            {                   
                var myBrewery = new Brewery(
                    Id: Convert.ToInt32(node.Properties["id"]),
                    Name: node.Properties["name"].ToString(),
                    Phone: "000-000-0000",
                    Address: "temp",
                    City: "temp",
                    State: "temp",
                    Code: -1,
                    Country: node.Properties["country"].ToString(),
                    Website: "temp",
                    descript: "temp"
                );
                Brewery correctBrewery = populateBrewery(myBrewery, node);
                correctBrewery.description = node.Properties.ContainsKey("descript") ?
                    node.Properties["descript"].ToString() : createBreweryDescription(connector, correctBrewery);
                breweries.Add(correctBrewery);
            });

            List<string> jsonBreweries = new List<string>();
            foreach (var brewery in breweries)
            {
                string jsonBrewery = JsonSerializer.Serialize(brewery);
                jsonBreweries.Add(jsonBrewery);
            }
            string jsonString = JsonSerializer.Serialize(jsonBreweries);
            Console.WriteLine(jsonString);
        }

        public static async Task filter(Neo4jConnection connector, string filterQuery)
        {
            List<Beer> filteredBeers = new List<Beer>();
            await connector.RunQueryAsync(filterQuery, node =>
            {                   
                var myBeer = new Beer(
                    Id: Convert.ToInt32(node.Properties["id"]),
                    Name: node.Properties["name"].ToString(),
                    Abv: Convert.ToDouble(node.Properties["abv"]),
                    breweryId: Convert.ToInt32(node.Properties["brewery_id"]),
                    catId: Convert.ToInt32(node.Properties["cat_id"]),
                    styleId: Convert.ToInt32(node.Properties["style_id"]),
                    descript: "temp"
                );

                myBeer.description = node.Properties.ContainsKey("descript") ?
                    node.Properties["descript"].ToString() : createBeerDescription(connector, myBeer).Result;
                // Console.WriteLine(myBeer.ToString());
                // Console.WriteLine();
                filteredBeers.Add(new Beer(myBeer.id, myBeer.name, myBeer.abv, myBeer.breweryID,
                    myBeer.catID, myBeer.styleID, myBeer.description));
            });

            List<string> jsonBeers = new List<string>();
            foreach (var beer in filteredBeers)
            {
                string jsonBeer = JsonSerializer.Serialize(beer);
                jsonBeers.Add(jsonBeer);
            }
            string jsonString = JsonSerializer.Serialize(jsonBeers);
            Console.WriteLine(jsonString);
        }

        static async Task Main(string[] args)
        {
            var uri = "neo4j+s://898b7be9.databases.neo4j.io";
            var username = "neo4j";
            var password = "eNZ9jFEEDpN0m1ZML57sP0AmaBM-9Vk-s12xGO6gxDA";
            string method = args[0];

            using (var connector = new Neo4jConnection(uri, username, password))
            {
                int skip = int.TryParse(args[1], out int parsedSkip) ? parsedSkip : 0;
                int limit = int.TryParse(args[2], out int parsedLimit) ? parsedLimit : 50;
                switch(method) 
                {
                    case "getBeers":
                        await getBeers(connector, skip, limit);
                        break;
                    case "getStyles":
                        await getStyles(connector);
                        break;
                    case "getCategories":
                        await getCategories(connector);
                        break;
                    case "getBreweries":
                        await getBreweries(connector, skip, limit);
                        break;
                    case "filter":
                        string styleIds = args[3];
                        string catIds = args[4];
                        string filterQuery = "MATCH (Beer:Beers)";
                        if(styleIds != "-1" && catIds != "-1") {
                            filterQuery = filterQuery + $@"
                                WHERE Beer.style_id IN [{styleIds}]
                                OR Beer.cat_id IN [{catIds}]
                                RETURN Beer
                                SKIP {skip} LIMIT {limit}
                            ";
                        }
                        else if(styleIds != "-1" && catIds == "-1") {
                            filterQuery = filterQuery + $@"
                                WHERE Beer.style_id IN [{styleIds}]
                                RETURN Beer
                                SKIP {skip} LIMIT {limit}
                            ";
                        }
                        else if(styleIds == "-1" && catIds != "-1") {
                            filterQuery = filterQuery + $@"
                                WHERE Beer.cat_id IN [{catIds}]
                                RETURN Beer
                                SKIP {skip} LIMIT {limit}
                            ";
                        } else { 
                            filterQuery = filterQuery + $@"
                                RETURN Beer
                                SKIP {skip} LIMIT {limit}
                            ";
                        }
                        await filter(connector, filterQuery);
                        break;
                    default:
                        break;
                }
                connector.Dispose();
            }
        }
    }
}
