import states from "../stateData/state.js";

// Style..........
const targetDiv = document.getElementById("weatherShow");
targetDiv.style.display='none';

// TODO: createWeatherCard..........
function createWeatherCard(data) {
  console.log(data);
  const targetDiv = document.getElementById("weatherShow");
  targetDiv.style.display = "block";
  targetDiv.innerHTML = `<div class="card border border-white bg-danger py-5">
  <div class='card-header bg-danger d-flex justify-content-center align-items-center flex-column'>
  <img src="${data.current.condition.icon}" class="img-fluid img-style" alt="${data.location.region}">
  <h5 class='leed text-uppercase mt-3 text-light fw-bold'>${data.location.region}</h5>
  <p class=' text-light px-3 py-1 bg-success'>${data.location.tz_id} <span class=' ps-3 bg-success fw-bold'>${new Date(data.location.localtime).toLocaleDateString('en-IN')}</span></p>
  </div>
  <div class="card-body">
    <div class='row'>
    <div class='col-6 text-center text-light'>${data.current.temp_c}&#176;<i class="fa-solid fa-c ps-2"></i></div>
    <div class='col-6 text-center text-light'>${data.current.temp_f}&#176;<i class="fa-solid fa-f ps-2"></i></div>
    </div>
  </div>
</div>`;
}

async function fetchWeatherApi(state) {
  const weatherState = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=16ef584767dc459ebbc153143242407&q=${state}`
  );
  const dataJson = await weatherState.json();
  if (dataJson) {
    createWeatherCard(dataJson);
  } else {
    return null;
  }
}

// TODO: Form addEventListener............
document.getElementById("weatherForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const state = event.target.elements["state"].value;
  fetchWeatherApi(state);
});

function createSelectInput(state) {
  const selectInput = document.getElementById("state");
  const createOption = document.createElement("option");
  selectInput.options[0].disabled = true;
  createOption.setAttribute("value", state);
  createOption.textContent = state;
  return selectInput.append(createOption);
}

states.forEach((value) => {
  // console.log(value.name.en)
  createSelectInput(value.name.en);
});
