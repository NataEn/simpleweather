const picture = document.querySelector("picture");
const countryData = document.querySelector("#countryData");
picture.addEventListener("click", () => {
  countryData.classList.add("hide");
});
