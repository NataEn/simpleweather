document.querySelector("input").addEventListener("change", event => {
  document.querySelector("#countryData").innerHTML = "<h4>...loading</h4>";
  let countries = fetch("https://restcountries.eu/rest/v2/all");
  console.log(countries);
  let results = countries.map(country => {
    if (country.name.includes(event.target.value)) {
      return `<li>${country.name} :${country.capital}</li>`;
    }
  });
  document.querySelector("#countryData").innerHTML = results;
});
