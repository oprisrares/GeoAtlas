using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SpringApiClient
{
    public partial class Form1 : Form
    {
        private static readonly string API_URL = "http://localhost:8081/api";
        private readonly HttpClient _http = new HttpClient();

        public Form1()
        {
            InitializeComponent();
            LoadContinentsIntoComboBox();
        }

        // --- Load all continents into ComboBox ---
        private async void LoadContinentsIntoComboBox()
        {
            try
            {
                var response = await _http.GetAsync($"{API_URL}/continents");
                response.EnsureSuccessStatusCode();

                var json = await response.Content.ReadAsStringAsync();
                var continents = JsonConvert.DeserializeObject<List<Continent>>(json);

                cmbContinents.Items.Clear();
                foreach (var cont in continents.OrderBy(c => c.Name))
                    cmbContinents.Items.Add(cont.Name);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error loading continents: " + ex.Message);
            }
        }

        private void btnSortAlphabetically_Click_1(object sender, EventArgs e)
        {
            var items = lstResults.Items.Cast<string>()
                        .OrderBy(x => x, StringComparer.OrdinalIgnoreCase)
                        .ToList();

            lstResults.Items.Clear();
            foreach (var item in items)
                lstResults.Items.Add(item);
        }

        private async void btnLoadContinents_Click_1(object sender, EventArgs e)
        {
            try
            {
                var response = await _http.GetAsync($"{API_URL}/continents");
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();
                var continents = JsonConvert.DeserializeObject<List<Continent>>(json);

                lstResults.Items.Clear();

                foreach (var cont in continents.OrderBy(c => c.Name))
                {
                    lstResults.Items.Add($"CONTINENT: {cont.Name}");

                    // Fetch countries for this continent
                    var countriesResponse = await _http.GetAsync($"{API_URL}/countries/continent/{cont.Name}");
                    countriesResponse.EnsureSuccessStatusCode();

                    var countriesJson = await countriesResponse.Content.ReadAsStringAsync();
                    var countries = JsonConvert.DeserializeObject<List<Country>>(countriesJson);

                    foreach (var c in countries.OrderBy(c => c.Name))
                    {
                        lstResults.Items.Add($"   - {c.Name} (Pop: {c.Population ?? 0})");
                    }

                    lstResults.Items.Add(""); // spacer
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error fetching continents and countries: " + ex.Message);
            }
        }

        private async void btnLoadCountries_Click_1(object sender, EventArgs e)
        {

            if (cmbContinents.SelectedItem == null)
            {
                MessageBox.Show("Select a continent!");
                return;
            }

            string continent = cmbContinents.SelectedItem.ToString();

            try
            {
                var response = await _http.GetAsync($"{API_URL}/countries/continent/{continent}");
                response.EnsureSuccessStatusCode();

                string json = await response.Content.ReadAsStringAsync();
                var countries = JsonConvert.DeserializeObject<List<Country>>(json);

                lstResults.Items.Clear();
                foreach (var c in countries.OrderBy(c => c.Name))
                {
                    lstResults.Items.Add($"{c.Id} - {c.Name} (Pop: {c.Population ?? 0})");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error fetching countries: " + ex.Message);
            }
        }

        private void cmbContinents_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
