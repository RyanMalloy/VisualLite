using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConnectToNeo4j
{
    public class Beer
    {
        public int id { get; set; }
        public string name { get; set; }
        public double abv { get; set; }
        public int breweryID { get; set; }
        public int catID { get; set; }
        public int styleID { get; set; }
        public string description { get; set; }

        public Beer(int Id, string Name, double Abv, int breweryId, int catId, int styleId, string descript)
        {
            id = Id;
            name = Name;
            abv = Abv;
            breweryID = breweryId;
            catID = catId;
            styleID = styleId;
            description = descript;
        }

        public override string ToString()
        {
            string one = $"ID: {id}, Name: {name}, ABV: {abv}, ";
            string two = $"Brewery ID: {breweryID}, Category ID: {catID}, ";
            string three = $"Style ID: {styleID}, Description: {description}";
            return one + two + three;
        }
    }
}
