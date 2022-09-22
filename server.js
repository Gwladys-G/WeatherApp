if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const { default: axios } = require('axios')
// const MAPBOX_API = process.env.MAPBOX_API

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req,res) => {




  let lat =req.body.latitude
  let long =req.body.longitude
  console.log(lat);
  console.log(long);

  let apikey= OPENWEATHER_API_KEY
  let unit = 'metric'
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=${unit}`
  axios({
    url: url,
    responseType: 'json'
  }).then(data =>
    res.json(data.data)
    )
})

app.listen(3000, () => {
  console.log('Server Started')
})
