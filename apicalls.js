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
        console.log(country.timezones[0]);
        let countryElement = document.createElement("li");
        countryElement.setAttribute("data-country", `${country.name}`);
        countryElement.setAttribute("data-capital", `${country.capital}`);
        countryElement.setAttribute("data-time", `${country.timezones[0]}`);
        countryElement.addEventListener("click", fetchLocationWeather);
        countryElement.innerHTML = `${country.name}:${country.capital}`;
        document.querySelector("#countryData").appendChild(countryElement);
      }
    })
    .catch(error => {
      console.error("There has been a problem with fetching data:", error);
    });
});
function fetchLocationWeather(e) {
  let pickedLocations = document.querySelectorAll("#countryData li");
  const localtime = e.target.dataset;
  if (pickedLocations) {
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
        updateWeatherPanel(json, localtime);
      })
      .catch(error => {
        console.error("There has been a problem with fetching data:", error);
      });
  }
}
function updatePickedTime(data) {
  const minutes = data.time.match(/\d+$/);
  const hours = data.time.match(/[0-9]*(?=:)/)[0];
  const pickedHours = hours[0] === "0" ? parseInt(hours[1]) : parseInt(hours);
  const pickedMinutes =
    minutes[0] === "0" ? parseInt(minutes[1]) : parseInt(minutes);
  const currentTimeHours = new Date().getHours() + pickedHours;
  const currentTimeMinutes = new Date().getMinutes() + pickedMinutes;
  return `${new Date().toDateString()}\n ${currentTimeHours}:${currentTimeMinutes}`;
}
function updateWeatherPanel(weatherObject, data) {
  console.log(weatherObject);
  console.log(data.time);
  // const minutes = data.time.match(/\d+$/);
  // const hours = data.time.match(/[0-9]*(?=:)/)[0];
  // const pickedHours = hours[0] === "0" ? parseInt(hours[1]) : parseInt(hours);
  // const pickedMinutes =
  //   minutes[0] === "0" ? parseInt(minutes[1]) : parseInt(minutes);
  // const currentTimeHours = new Date().getHours() + pickedHours;
  // const currentTimeMinutes=new Date().getMinutes() + pickedMinutes;
  console.log(updatePickedTime(data));
  console.log(currentTime);
  // const currentTime=new Date().toLocaleDateString(undefined,{timeStyle:"long",timeZone:"Asia/Kolkata",timeZoneName:"long"})
  //   const weatherPanel=document.querySelector(".pickedLocationWeather")
  //         const description=document.createElement('div');
  //         description.setAttribute("class","description");
  //         description.innerHTML=`<`

  //   <div class="current_temp"></div>
  //   <div class="feelsLike"></div>
  //   <div class="cloudesSpread"></div>
  //   <div class="sunrise"></div>
  //   <div class="sunset"></div>
}
