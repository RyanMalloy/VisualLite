using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConnectToNeo4j
{
    public class Category
    {
        public int id { get; set; }
        public string name { get; set; }
        public Category(int ID, string Name)
        {
            id = ID;
            name = Name;
        }

        public override string ToString()
        {
            return $"ID: {id}, Name: {name}";
        }
    }
}