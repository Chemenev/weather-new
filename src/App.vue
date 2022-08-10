<template>
  <router-link to="/">Weather</router-link>
  <router-link to="/rates">Rates</router-link>
  <router-view></router-view>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  async created() {
    this.fetchWeather();
    this.fetchRates();
  },
  mounted() {
    if (localStorage.getItem('city-list')) {
      console.log('sa');

      for (const item of JSON.parse(localStorage.getItem('city-list'))) {
        console.log(item);
        this.addCityList(item);
      }
    }
  },
  methods: {
    ...mapActions('weather', ['fetchWeather']),
    ...mapActions('exchangeRates', ['fetchRates']),
    ...mapMutations('weather', ['addCityList']),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 2vh 20vh;
}

* {
  box-sizing: border-box;
}
</style>
