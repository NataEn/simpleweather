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
        updateWeatherPanel(json, e.target.dataset);
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
function updateBackground(weatherCode) {
  console.log(weatherCode);
  let picture = document.querySelector("picture");
  let code = weatherCode;
  let weather = "";
  switch (true) {
    case code >= 200 && code <= 232:
      weather = "Thunderstorm";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/thunderstorm.webp")'
      );
      break;
    case code >= 300 && code <= 321:
      weather = "Drizzle";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/drizzle.webp")'
      );
      break;
    case code >= 500 && code <= 531:
      weather = "Rain";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/rain.webp")'
      );
      break;
    case code >= 600 && code <= 622:
      weather = "Snow";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/snow.webp")'
      );
      break;
    case code >= 701 && code <= 741:
      weather = "Fogg";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/fogg.webp")'
      );
      break;
    case code >= 751 && code <= 761:
      weather = "Sand";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/sandstorm.webp")'
      );
      break;
    case code === 762:
      weather = "Volcanic ash";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/volcano.webp")'
      );
      break;
    case code === 781:
      weather = "Tornado";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/tornado.webp")'
      );
      break;
    case code === 800:
      weather = "Clear";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/clear.webp")'
      );
      console.log(weather);
      break;
    case code >= 801 && code <= 804:
      weather = "Cloudes";
      console.log(weather);
      picture.setAttribute(
        "style",
        'background-image: url("./assets/cloudy.webp")'
      );
      break;
    default:
      picture.setAttribute(
        "style",
        'background-image: url("./assets/clear.webp")'
      );
  }
}
function updateWeatherPanel(weatherObject, data) {
  console.log(weatherObject);
  updateBackground(weatherObject.weather[0].id);
  let locationTime = updatePickedTime(data);
  //const currentTime=new Date().toLocaleDateString(undefined,{timeStyle:"long",timeZone:"Asia/Kolkata",timeZoneName:"long"})
  const weatherPanel = document.querySelector(".pickedLocationWeather");
  const locationHeader = document.createElement("h3");
  locationHeader.innerHTML = `${data.country} <small>${data.capital}</small>`;
  const time = document.createElement("div");
  time.innerHTML = `<h3>${locationTime.dateString}</h3><p>${
    locationTime.hours < 10 ? "0" + locationTime.hours : locationTime.hours
  }:${
    locationTime.minutes < 10
      ? "0" + locationTime.minutes
      : locationTime.minutes
  }</p>`;
  const description = document.createElement("div");
  description.setAttribute("class", "description");
  description.innerHTML = `<img src=\"http://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png\" alt="icon"/><span>${weatherObject.weather[0].description}</span>`;
  const currentTemp = document.createElement("div");
  currentTemp.setAttribute("class", "currentTemp");
  currentTemp.innerHTML = `Temp: ${weatherObject.main.temp}<small>F</small>`;
  const feelsLike = document.createElement("div");
  feelsLike.setAttribute("class", "feelsLike");
  feelsLike.innerHTML = `Feels Like: ${weatherObject.main.feels_like}<small>F</small>`;
  weatherPanel.innerHTML = "";
  weatherPanel.appendChild(locationHeader);
  weatherPanel.appendChild(time);
  weatherPanel.appendChild(description);
  weatherPanel.appendChild(currentTemp);
  weatherPanel.appendChild(feelsLike);
}
