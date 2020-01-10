const baseCountriesUrl = "https://restcountries.eu/rest/v2/all";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const worldWeatherApiKey = "d0b025b8d5175bec9c70a20cac4aeffe";
document.querySelector("input").addEventListener("change", event => {
  document.querySelector("#countryData").innerHTML = "<h4>...loading</h4>";
  let countriesList = "";
  fetch(baseCountriesUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      let countries = json.filter(country =>
        country.name.toLowerCase().includes(event.target.value)
      );
      document.querySelector("#countryData").innerHTML = "";
      for (let country of countries) {
        let countryElement = document.createElement("li");
        countryElement.setAttribute("data-country", `${country.name}`);
        countryElement.setAttribute("data-capital", `${country.capital}`);
        countryElement.addEventListener("click", fetchLocationWeather);
        countryElement.innerHTML = `${country.name} :${country.capital}`;
        document.querySelector("#countryData").appendChild(countryElement);
      }
    })
    .catch(error => {
      console.error("There has been a problem with fetching data:", error);
    });
});
function fetchLocationWeather(e) {
  let pickedLocations = document.querySelectorAll("#countryData li");
  if (pickedLocations) {
    console.log(e.target.dataset.country);
    fetch(
      baseWeatherUrl +
        "q=" +
        e.target.dataset.capital +
        "," +
        e.target.dataset.country +
        "&appid=" +
        worldWeatherApiKey
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error("There has been a problem with fetching data:", error);
      });
  }
}
