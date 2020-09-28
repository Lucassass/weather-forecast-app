<template>
  <div class="app-wrap">
    <header>
      <input
        v-model="searchString"
        type="text"
        autocomplete="off"
        class="search-box"
        placeholder="Search for a city..."
      />
    </header>
    <main>
      <section class="location">
        <div class="city">{{ cityAndCountry }}</div>
        <div class="date">{{ date }}</div>
      </section>
      <div class="current">
        <div class="temp">{{ tempCurr }}°c</div>
        <div class="weather">{{ weatherCurr }}</div>
        <div class="hi-low">{{ tempLow }}°c / {{ tempHigh }}°c</div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchString: 'Odense',
      cityAndCountry: null,
      date: null,
      tempCurr: null,
      tempHigh: null,
      tempLow: null,
      weatherCurr: null,
      debounceTimeout: null,
    }
  },
  watch: {
    searchString() {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(() => {
        this.getWeather()
      }, 500)
    },
  },
  mounted() {
    this.getWeather()
  },
  methods: {
    async getWeather() {
      try {
        const data = await this.$axios.$get('/weather', {
          params: {
            q: this.searchString,
          },
          timeout: 1000,
        })

        this.cityAndCountry = data.name + ', ' + data.sys.country
        this.date = this.dateBuilder(new Date())
        this.tempCurr = Math.round(data.main.temp)
        this.tempLow = data.main.temp_min
        this.tempHigh = data.main.temp_max
        this.weatherCurr = data.weather[0].main
      } catch (err) {}
    },
    dateBuilder(d) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]

      const day = days[d.getDay()]
      const date = d.getDate()
      const month = months[d.getMonth()]
      const year = d.getFullYear()

      return `${day} ${date} ${month} ${year}`
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
  background-image: url('/images/desert-sun.jpg');
  background-size: contain;
  background-position: top center;
}

.app-wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 15px 15px;
}

header input {
  width: 100%;
  max-width: 280px;
  padding: 10px 15px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 16px 16px 16px 16px;
  border-bottom: 4px solid #daa520;
  color: #313131;
  font-size: 20px;
  font-weight: 300;
  transition: 0.2s ease-out;
}

header input :focus {
  background-color: rgba(255, 255, 255, 0.6);
}

main {
  flex: 1 1 100%;
  padding: 25px 25px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.location .city {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 5px;
}

.location .date {
  color: #fff;
  font-size: 16px;
}

.current .temp {
  color: #fff;
  font-size: 102px;
  font-weight: 900;
  margin: 30px 0;
  text-shadow: 0.05em 0.1em rgba(0, 0, 0, 0.6);
}

.current .temp span {
  font-weight: 500;
}

.current .weather {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  font-style: italic;
  margin-bottom: 15px;
  text-shadow: 0.05em 0.1em rgba(0, 0, 0, 0.4);
}

.current .hi-low {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  text-shadow: 0.05em 0.1em rgba(0, 0, 0, 0.4);
}
</style>
