const form =document.getElementById('form-address-search')


const adressInput = document.getElementById("address-search-box")
const postalInput = document.getElementById("postalcode-search-box")
const cityInpunt = document.getElementById("city-search-box" )
const stateInput = document.getElementById("state-search-box" )
const countryInput= document.getElementById("country-search-box")

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

const locateMe = document.getElementById("locate-me")
const defaultLocate = document.getElementsByClassName("mapboxgl-ctrl-geolocate")

const geolocalisationButton = document.getElementsByClassName("mapboxgl-ctrl-geolocate")

locateMe.addEventListener('click', () => {
  defaultLocate[0].click();
})


mapboxgl.accessToken = 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-24, 42], // starting center in [lng, lat]
  zoom: 1, // starting zoom
});


let geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
map.on("load", function () {
});
geolocate.on("geolocate",locateUser);

function locateUser(e) {
  let longitude = e.coords.longitude
  let latitude = e.coords.latitude
  getFullAddress(longitude, latitude)
}


const getFullAddress = async (long, lat) =>{
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg`
  await fetch (url,{
    access_token: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  })
    .then(res => res.json())
    .then(data => {
      let fullAddress = data.features[0].place_name
      talkToServer(lat,long,fullAddress)
    }
    )
    .catch(error => {
      console.log(error);
    });
}
form.addEventListener('submit', (e) => logSubmit(e));
adressInput.addEventListener('input', (e) => displayDetails(e.target.value));

const search = () => {
  mapboxsearch.autofill({
    accessToken: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  });
};

const displayDetails = (e) => {
  let query = e
  adressInput.value = e
  if(postalInput.value != "") {
    postalInput.classList.remove("hide")
  }
}

const logSubmit = (e) => {
  e.preventDefault()
  let addressLine1 = e.target.elements[0].value
  let postCode = e.target.elements[2].value
  let city = e.target.elements[3].value
  let state = e.target.elements[4].value

  let fullAddress = `${addressLine1} ${postCode} ${city} ${state}`
  getCoordinates(fullAddress)
  adressInput.value = ""
  postalInput.value = ""
  cityInpunt.value = ""
  stateInput.value = ""
  countryInput.value = ""
}


const getCoordinates = async (fullAddress) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullAddress}.json?access_token=pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg`
  await fetch (url,{
    access_token: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  })
    .then(res => res.json())
    .then(data => {
      let longitude = data.features[0].geometry.coordinates[0]
      let lattitude = data.features[0].geometry.coordinates[1]
      talkToServer(lattitude,longitude,fullAddress)
      console.log(longitude)
      console.log(lattitude)
    }
    )
    .catch(error => {
      console.log(error);
    });
}

const talkToServer = async (lat,long,fullAddress) =>{
  console.log("talktoserver");
  await fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: lat,
      longitude: long
    })
    }).then(res => res.json()).then(data => {
      setWeatherData(data, fullAddress, lat, long)
    })
  }

const setWeatherData = (data, fullAddress, lat, long ) => {
  let rain
  let wind
  if (data.rain) {
    rain = `${data.rain['1h']}mm the last hour`
  }else {
    rain = `NA`
  }
  if (data.wind) {
    wind = `${data.wind.speed} meter/sec`
  } else {
    wind = `NA`
  }
  locationElement.textContent = fullAddress
  statusElement.textContent = `${data.weather[0].main} / ${data.weather[0].description}`
  temperatureElement.textContent = `${data.main.temp} C`
  windElement.textContent = wind
  precipitationElement.textContent = rain
  document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  document.getElementById("icon").alt = data.weather[0].description


  map.flyTo({center:[long, lat], zoom: 15});

}

search();
