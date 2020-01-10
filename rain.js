const addCloudes = function(num) {
  const cloudes = document.querySelector("div.cloudes");
  for (let i = 1; i <= num; i++) {
    let cloude = document.createElement("div");
    cloude.setAttribute("class", "cloude");
    cloude.setAttribute("style", `left:${Math.random() * 500}px`);
    let cloudeTop1 = document.createElement("div");
    cloudeTop1.setAttribute("class", "cloudePart");
    cloudeTop1.setAttribute("style", "top:5px; left:-87px");
    let cloudeTop2 = document.createElement("div");
    cloudeTop2.setAttribute("class", "cloudePart");
    cloudeTop2.setAttribute("style", "top:-5px; left:-95px");
    let cloudeTop3 = document.createElement("div");
    cloudeTop3.setAttribute("class", "cloudePart");
    cloudeTop3.setAttribute("style", "top:-2px; left:-101px;");
    let cloudeBottom1 = document.createElement("div");
    cloudeBottom1.setAttribute("class", "cloudePart");
    cloudeBottom1.setAttribute(
      "style",
      "width:100px;top:20px;border-radius: 50px;"
    );
    cloude.appendChild(cloudeBottom1);
    cloude.appendChild(cloudeTop1);
    cloude.appendChild(cloudeTop2);
    cloude.appendChild(cloudeTop3);
    cloudes.appendChild(cloude);
  }
};

const makeItRain = function() {
  //clear out everything
  document.querySelector(".rain").innerHTMl = "";

  let increment = 0;
  let drops = "";
  let backDrops = "";

  while (increment < 100) {
    let randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);

    let randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
    increment += randoFiver;
    //add in a new raindrop with various randomizations to certain CSS properties
    drops +=
      '<div class="drop" style="left: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.6" +
      randoHundo +
      's;"></div>';
    backDrops +=
      '<div class="drop" style="right: ' +
      increment +
      "%; bottom: " +
      (randoFiver + randoFiver - 1 + 100) +
      "%; animation-delay: 0." +
      randoHundo +
      "s; animation-duration: 0.7" +
      randoHundo +
      's;"></div>';
  }
  document.querySelector(".rain.front-row").innerHTML = drops;
  document.querySelector(".rain.back-row").innerHTML = backDrops;
};

makeItRain();
addCloudes(3);
