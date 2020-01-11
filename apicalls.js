class WeatherPanel {
  constructor(place) {}
}

const baseCountriesUrl = "https://restcountries.eu/rest/v2/all";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const worldWeatherApiKey = "d0b025b8d5175bec9c70a20cac4aeffe";
document.querySelector("input").addEventListener("change", event => {
  const countryData = document.querySelector("#countryData");
  if (countryData.classList.contains("hide")) {
    countryData.classList.remove("hide");
  }
  countryData.innerHTML = "<h4>...loading</h4>";
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
      console.log(countries);
      if (countries.length > 0) {
        console.log("found countries");
        for (let country of countries) {
          let countryElement = document.createElement("li");
          countryElement.setAttribute("data-country", `${country.name}`);
          countryElement.setAttribute("data-capital", `${country.capital}`);
          countryElement.setAttribute("data-time", `${country.timezones[0]}`);
          countryElement.addEventListener("click", fetchLocationWeather);
          countryElement.innerHTML = `${country.name}:${country.capital}`;
          countryData.appendChild(countryElement);
          countryData.setAttribute("style", "height:30vh");
        }
      } else {
        const countries = document.querySelector(".countries");
        emptyList = document.createElement("li");
        emptyList.innerHTML = "No results were found";
        emptyList.style.pointerEvents = "none";
        countryData.appendChild(emptyList);
        countryData.style.height = "auto";
        countryData.style.width = "max-content";
        countryData.style.overflow = "visible";
        countries.style.display = "block";
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
  console.log(minutes[0][0]);
  const hours = data.time.match(/[0-9]*(?=:)/)[0];
  const pickedHours = hours[0] === "0" ? parseInt(hours[1]) : parseInt(hours);
  const pickedMinutes =
    minutes[0][0] === "0" ? parseInt(minutes[0][1]) : parseInt(minutes[0][0]);

  const currentTimeHours = new Date().getHours() + pickedHours;
  const currentTimeMinutes = new Date().getMinutes() + pickedMinutes;
  return {
    dateString: new Date().toDateString(),
    hours: currentTimeHours,
    minutes: currentTimeMinutes
  };
}
function updateWeatherPanel(weatherObject, data) {
  console.log(weatherObject);
  console.log(data.time);
  let locationTime = updatePickedTime(data);
  //const currentTime=new Date().toLocaleDateString(undefined,{timeStyle:"long",timeZone:"Asia/Kolkata",timeZoneName:"long"})
  const weatherPanel = document.querySelector(".pickedLocationWeather");
  const time = document.createElement("div");
  time.innerHTML = `<h3>${locationTime.dateString}</h3><p>${locationTime.hours}:${locationTime.minutes}</p>`;
  const description = document.createElement("div");
  description.setAttribute("class", "description");
  description.innerHTML = `${weatherObject.weather[0].description}`;
  const currentTemp = document.createElement("div");
  currentTemp.setAttribute("class", "currentTemp");
  currentTemp.innerHTML = `Temp: ${weatherObject.main.temp}<small>F</small>`;
  const feelsLike = document.createElement("div");
  feelsLike.setAttribute("class", "feelsLike");
  feelsLike.innerHTML = `Feels Like: ${weatherObject.main.feels_like}<small>F</small>`;
  weatherPanel.innerHTML = "";
  weatherPanel.appendChild(time);
  weatherPanel.appendChild(description);
  weatherPanel.appendChild(currentTemp);
  weatherPanel.appendChild(feelsLike);
}
