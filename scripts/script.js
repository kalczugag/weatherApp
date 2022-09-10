const el = document.getElementById("input-city-name");

const nLoading = document.querySelector(".notification-container-loading");
const nError = document.querySelector(".notification-container-error");
const inputS = document.querySelector(".input-section");
const buttonS = document.querySelector(".button-section");
const orText = document.querySelector(".or-text");
const weatherInfo = document.querySelector(".weather-info");
const weatherInfoFooter = document.querySelector(".weather-info-footer");

el.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (el.value.length < 1) {
      document.querySelector(
        ".notification-container-error"
      ).innerHTML = `${el.value} isn't a valid city name`;

      return (document.querySelector(
        ".notification-container-error"
      ).style.display = "block");
    }
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "308b0741a6mshe9fdd69f9c3b6fap1d7ebdjsn0d4beef1ac74",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${el.value}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        wrapperChange(response);
      })
      .catch((err) => {
        console.log(err);
        notifications(err);
      });
  }
});

const wrapperChange = (resp) => {
  if (resp.ok) {
    nLoading.style.display = "none";
    nError.style.display = "none";
    inputS.style.display = "none";
    buttonS.style.display = "none";
    orText.style.display = "none";
    weatherInfo.style.display = "flex";

    if ((resp.current.condition = "overcast")) {
      document.querySelector(
        ".cloud-image"
      ).innerHTML = `<img src="weatherIcons/cloud.svg" width=110>`;
    }
    document.querySelector(".temp").innerHTML = `${resp.current.temp_c}&deg;C`;
    //   document.querySelector(".cloud-description").innerHTML =
    resp.current.condition;
    weatherInfoFooter.style.display = "flex";
    document.querySelector(".humidity-percent").innerHTML = resp.current.text;
  }
};

const notifications = (err) => {
  nError.style.display = "block";
  return (nError.innerHTML = "No matching location found");
};
