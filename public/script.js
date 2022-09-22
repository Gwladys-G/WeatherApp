const addressInput = document.getElementById('address-input')
const form =document.getElementById('form-city-search')
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


const getCoordinates =(fullAddress) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${fullAddress}.json?access_token=pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg`
  fetch (url,{
    access_token: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  })
    .then(res => res.json())
    .then(data => {
      let lattitude = data.features[0].geometry.coordinates[0]
      let longitude = data.features[0].geometry.coordinates[1]
      getWeather(lattitude,longitude)
    }
    )
    .catch(error => {
      console.log(error);
    });
}

const getWeather = (lat, long) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4104b541de092d4999a4fd6dbc1a6887`
  fetch (url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

    }
    )
    .catch(error => {
     console.log(error);
  });
}





search();
