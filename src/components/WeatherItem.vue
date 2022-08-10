<template>
  <div class="weather-container__item">
    <div>{{ dayWeek }}</div>
    <img :src="weatherIconSrc" alt="weather" />
    <div class="weather-container__temperature">{{ weatherTemperature }}°C</div>
  </div>
</template>

<script>
const DAY_MAP = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

export default {
  props: {
    day: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    weatherTemperature() {
      return Math.round(this.day.main.temp);
    },
    dayWeek() {
      let numDay = new Date(this.day.dt_txt).getDay();
      return DAY_MAP[numDay];
    },
    weatherIconSrc() {
      return `https://openweathermap.org/img/wn/${this.day.weather[0]['icon']}@2x.png`;
    },
  },
};
</script>

<style>
.weather-container__item {
  width: 14%;
  padding: 15px;
  text-align: center;
}

.weather-container__temperature {
  font-size: 1.2em;
  font-weight: 600;
}
</style>
