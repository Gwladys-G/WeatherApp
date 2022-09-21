console.log('coucou de script')
const addressInput = document.getElementById('address-input')



const search = () => {
  mapboxsearch.autofill({
    accessToken: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
  });
};

// const test = (e) => {
//   console.log(e.target.value)
//   let address = e.target.value
//   let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg`
//   fetch (url,{
//     access_token: 'pk.eyJ1IjoiZ3dsYWR5c2VuZyIsImEiOiJjbDJ0YTV2MjEwMmUyM2Jud3gwano1c3drIn0.iaRnMIzWno7DG8KJODpGbg'
//   })
//     .then(res => res.json())
//     .then(data =>  console.log(data.features[0].geometry.coordinates))
// }

search();
// addressInput.addEventListener('change', (event) => { test(event) });
