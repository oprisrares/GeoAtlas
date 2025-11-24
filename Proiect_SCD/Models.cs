using System.Collections.Generic;

namespace SpringApiClient
{
    public class Country
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long? Population { get; set; }
        public long? Gdp { get; set; }
    }

    public class Continent
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Country> Countries { get; set; }
    }
}
