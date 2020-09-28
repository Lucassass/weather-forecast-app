import express from 'express'
import axios from 'axios'

require('dotenv').config({
  path: '../../.env',
})

const app = express()

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const client = axios.create({
  baseURL: WEATHER_API_BASE_URL,
  params: {
    APPID: process.env.API_KEY,
  },
  timeout: 1000,
})

app.get('/weather', async (req, res) => {
  const search = req.query.q
  if (!search) {
    res.status(400).json({
      success: false,
      error: 'Missing search param',
    })
    return
  }

  const response = await client.get('/weather', {
    params: {
      q: search,
      units: 'metric',
    },
  })

  const data = response.data

  /* {
    coord: {
      lon: 12.57,
      lat: 55.68
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04n'
      }
    ],
    base: 'stations',
    main: {
      temp: 16.23,
      feels_like: 13.18,
      temp_min: 16,
      temp_max: 16.67,
      pressure: 1008,
      humidity: 87
    },
    visibility: 10000,
    wind: {
      speed: 6.2,
      deg: 50
    },
    clouds: {
      all: 76
    },
    dt: 1601252102,
    sys: {
      type: 1,
      id: 1575,
      country: 'DK',
      sunrise: 1601269628,
      sunset: 1601311999
    },
    timezone: 7200,
    id: 2618425,
    name: 'Copenhagen',
    cod: 200
  } */

  // console.log(data)

  res.json(data)
})

app.use((req, res, next) => {
  res.status(404).json({})
})

export default app

/* require('dotenv').config(); */

/* const api = {
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
} */
