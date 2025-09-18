document.addEventListener("DOMContentLoaded", function () {
  const key = "d65445a21faacb65aa8b76aed22e7944";

  let result = document.getElementById("result");
  let searchBtn = document.getElementById("search-btn");
  let cityRef = document.getElementById("city");

  //Function to fetch weather details from api and display them
  let getWeather = (cityName) => {
    let cityValue = cityName || cityRef.value;
    //If input field is empty
    if (cityValue.length == 0) {
      result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    }
    //If input field is NOT empty
    else {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
      fetch(url)
        .then((resp) => resp.json())
        //If city name is valid
        .then((data) => {
          if (data && data.cod === 200 && data.weather && data.weather.length > 0 && data.main) {
            result.innerHTML = `
            <h2>${data.name}</h2>
            <h4 class="weather">${data.weather[0].main}</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176;</h1>
            <div class="temp-container">
                <div>
                    <h4 class="title">min</h4>
                    <h4 class="temp">${data.main.temp_min}&#176;</h4>
                </div>
                <div>
                    <h4 class="title">max</h4>
                    <h4 class="temp">${data.main.temp_max}&#176;</h4>
                </div>
            </div>
            `;
          } else {
            result.innerHTML = `<h3 class="msg">City not found</h3>`;
          }
        })
        //If fetch fails
        .catch(() => {
          result.innerHTML = `<h3 class="msg">Unable to fetch data</h3>`;
        });
      //Clear the input field only after search
      cityRef.value = "";
    }
  };

  searchBtn.addEventListener("click", () => getWeather());
  window.addEventListener("load", () => getWeather(cityRef.value || "mumbai"));
});