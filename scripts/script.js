const el = document.getElementById("input-city-name");

const nLoading = document.querySelector(".notification-container-loading");
const nError = document.querySelector(".notification-container-error");
const inputS = document.querySelector(".input-section");
const buttonS = document.querySelector(".button-section");
const returnBtn = document.querySelector(".return-Button");
const orText = document.querySelector(".or-text");
const weatherInfo = document.querySelector(".weather-info");
const weatherInfoFooter = document.querySelector(".weather-info-footer");

el.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    nError.style.display = "none";
    returnBtn.onclick = () => {
      inputS.style.display = "block";
      buttonS.style.display = "block";
      orText.style.display = "block";
      weatherInfo.style.display = "none";
      weatherInfoFooter.style.display = "none";

      el.value = "";
    };

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          return pos.coords.latitude, pos.coords.longitude;
        });
      } else {
        return (nError.innerHTML =
          "Geolocation is not supported by this browser.");
      }
    }
    document.querySelector(".get-location-button").onclick = () => {
      getLocation();
    };

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "308b0741a6mshe9fdd69f9c3b6fap1d7ebdjsn0d4beef1ac74",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${
        el.value || getLocation()
      }`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        wrapperChange(response);
      })
      .catch((err) => onError(err));
  }
});

const tempIcon = document.querySelector(".temp-icon");

const wrapperChange = (resp) => {
  if ((el.value = resp.location.name)) {
    nLoading.style.display = "block";
    setTimeout(() => {
      nLoading.style.display = "none";
      nError.style.display = "none";
      inputS.style.display = "none";
      buttonS.style.display = "none";
      orText.style.display = "none";
      weatherInfo.style.display = "flex";

      document.querySelector(
        ".cloud-image"
      ).innerHTML = `<img src="${resp.current.condition.icon}" width=110>`;

      if (resp.current.temp_c <= 0) {
        tempIcon.innerHTML = `<i class="fa fa-thermometer-empty" aria-hidden="true"></i>`;
      } else if (resp.current.temp_c <= 5) {
        tempIcon.innerHTML = `<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>`;
      } else if (resp.current.temp_c <= 15) {
        tempIcon.innerHTML = `<i class="fa fa-thermometer-half" aria-hidden="true"></i>`;
      } else if (resp.current.temp_c <= 25) {
        tempIcon.innerHTML = `<i class="fa fa-thermometer-three-quarters" aria-hidden="true"></i>`;
      } else if (resp.current.temp_c > 25) {
        tempIcon.innerHTML = `<i class="fa fa-thermometer-full" aria-hidden="true"></i>`;
      }

      document.querySelector(
        ".temp"
      ).innerHTML = `${resp.current.temp_c}&deg;C`;
      document.querySelector(".cloud-description").innerHTML =
        resp.current.condition.text;
      document.querySelector(
        ".city-name"
      ).innerHTML = `${resp.location.name}, ${resp.location.country}`;

      weatherInfoFooter.style.display = "flex";
      document.querySelector(
        ".degree"
      ).innerHTML = `${resp.current.feelslike_c}&deg;C`;
      document.querySelector(
        ".humidity-percent"
      ).innerHTML = `${resp.current.humidity}%`;
    }, 3000);
  }
};

function onError() {
  nError.style.display = "block";
  nError.innerText = "No matching location found";
}
