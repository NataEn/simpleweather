const baseCountriesUrl = "https://restcountries.eu/rest/v2/all";
const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const worldWeatherApiKey = "d0b025b8d5175bec9c70a20cac4aeffe";
class LocationWeatherBanner {
  constructor(object) {
    this.country = object.country;
    this.capital = object.capital;
    this.timeString = object.time;
  }
  fetchWeather() {
    if (this.country) {
      fetch(
        baseWeatherUrl +
          "q=" +
          this.capital +
          "," +
          this.country +
          "&appid=" +
          worldWeatherApiKey
      )
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.updateWeatherPanel(json);
        })
        .catch(error => {
          console.error("There has been a problem with fetching data:", error);
        });
    }
  }
  updateTime() {
    const minutes = this.timeString.match(/\d+$/);
    const hours = this.timeString.match(/[0-9]*(?=:)/)[0];
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
  timeElement(timeObject) {
    //const currentTime=new Date().toLocaleDateString(undefined,{timeStyle:"long",timeZone:"Asia/Kolkata",timeZoneName:"long"})
    const time = document.createElement("div");
    const header = document.createElement("h3");
    const clock = document.createElement("p");
    header.innerText = `${timeObject.dateString}`;
    const hoursString =
      timeObject.hours < 10 ? "0" + timeObject.hours : timeObject.hours;
    const minutesString =
      timeObject.minutes < 10 ? "0" + timeObject.minutes : timeObject.minutes;
    clock.innerText = `${hoursString}:${minutesString}`;
    time.appendChild(header);
    time.appendChild(clock);
    return time;
  }
  updateBackground(weatherCode) {
    let picture = document.querySelector("picture");
    let code = weatherCode;
    let weather = "";
    switch (true) {
      case code >= 200 && code <= 232:
        weather = "Thunderstorm";

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
        weather = "fog";
        console.log(weather);
        picture.setAttribute(
          "style",
          'background-image: url("./assets/fog.webp")'
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
  updateWeatherPanel(weatherObject) {
    console.log("updating weather banner");
    this.updateBackground(weatherObject.weather[0].id);
    let locationTime = this.updateTime();
    let timeElement = this.timeElement(locationTime);
    const weatherPanel = document.querySelector(".pickedLocationWeather");
    const locationHeader = document.createElement("h3");
    locationHeader.innerHTML = `${this.country} <small>${this.capital}</small>`;
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
    weatherPanel.appendChild(timeElement);
    weatherPanel.appendChild(description);
    weatherPanel.appendChild(currentTemp);
    weatherPanel.appendChild(feelsLike);
  }
}

class WeatherPanel {
  constructor() {
    this.showCountriesList = this.showCountriesList.bind(this);
    this.fetchCountriesOnInput = this.fetchCountriesOnInput.bind(this);
    this.createWeatherBanner = this.createWeatherBanner.bind(this);
  }
  inputChangeListener() {
    document
      .querySelector("input")
      .addEventListener("change", this.fetchCountriesOnInput);
  }
  showCountriesList() {
    const countries = document.querySelector(".countries");
    if (countries.classList.contains("hide")) {
      countries.classList.remove("hide");
    }
  }
  setCountryListItem(country) {
    if (country !== undefined) {
      let countryElement = document.createElement("li");
      countryElement.setAttribute("data-country", `${country.name}`);
      countryElement.setAttribute("data-capital", `${country.capital}`);
      countryElement.setAttribute("data-time", `${country.timezones[0]}`);
      countryElement.addEventListener("click", this.createWeatherBanner);
      countryElement.innerHTML = `${country.name}:${country.capital}`;
      return countryElement;
    } else {
      console.log("undefined list");
      emptyList = document.createElement("li");
      emptyList.setAttribute("style", "pointer-events:none");
      emptyList.innerHTML = "No results were found";
      emptyList.style.pointerEvents = "none";
      return emptyList;
    }
  }
  fetchCountriesOnInput(event) {
    const countryData = document.querySelector("#countryData");
    this.showCountriesList();
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

        if (countries.length > 0) {
          for (let country of countries) {
            const itemElement = this.setCountryListItem(country);
            countryData.appendChild(itemElement);
            countryData.setAttribute("style", "height:30vh");
          }
        } else {
          const countries = document.querySelector(".countries");
          const itemElement = this.setCountryListItem();
          countryData.appendChild(itemElement);
          countryData.style.height = "auto";
          countryData.style.width = "max-content";
          countryData.style.overflow = "visible";
          return;
        }
      })
      .catch(error => {
        console.error("There has been a problem with fetching data:", error);
      });
  }
  createWeatherBanner(event) {
    const newBanner = new LocationWeatherBanner(event.target.dataset);
    newBanner.fetchWeather();
    console.log(newBanner);
  }
}
const weather = new WeatherPanel();
weather.inputChangeListener();
