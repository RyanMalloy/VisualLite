using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConnectToNeo4j
{
    public class Brewery {
        public int id { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int code { get; set; }
        public string country { get; set; }
        public string website { get; set; }
        public string description { get; set; }
        public Brewery(int Id, string Name, string Phone, string Address, string City, string State,
            int Code, string Country, string Website, string descript)
        {
            id = Id;
            name = Name;
            phone = Phone;
            address = Address;
            city = City;
            state = State;
            code = Code;
            country = Country;
            website = Website;
            description = descript;
        }

        public override string ToString()
        {
            string one = $"ID: {id}, Name: {name}, Phone: {phone}, Address: {address}";
            string two = $"City: {city}, State: {state}, Code: {code}, Country: {country}, ";
            string three = $"Website: {website}, Description: {description}";
            return one + two + three;
        }
    }
}
