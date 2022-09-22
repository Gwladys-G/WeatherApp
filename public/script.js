const addressInput = document.getElementById('address-input')
const form =document.getElementById('form-city-search')

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')


form.addEventListener('submit', (e) => logSubmit(e));

const search = () => {
  mapboxsearch.autofill({
    accessToken: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  });
};

const logSubmit = (e) => {
  e.preventDefault()
  let addressLine1 = e.target.elements[0].value
  let postCode = e.target.elements[2].value
  let city = e.target.elements[3].value
  let state = e.target.elements[4].value

  let fullAddress = `${addressLine1} ${postCode} ${city} ${state}`
  getCoordinates(fullAddress)
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
      console.log(data);
      setWeatherData(data, fullAddress)
    })
  }

const setWeatherData = (data, fullAddress ) => {
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

}

search();
