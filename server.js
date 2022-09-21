if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
// const MAPBOX_API = process.env.MAPBOX_API

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req,res) => {
  console.log(req.body)
})

app.listen(3000, () => {
  console.log('Server Started')
})
