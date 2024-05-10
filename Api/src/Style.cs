using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConnectToNeo4j
{
    public class Style
    {
        public int id { get; set; }
        public string name { get; set; }
        public int catID { get; set; }
        public Style(int ID, string Name, int catId)
        {
            id = ID;
            name = Name;
            catID = catId;
        }

        public override string ToString()
        {
            return $"ID: {id}, Name: {name}, CatID: {catID}";
        }
    }
}