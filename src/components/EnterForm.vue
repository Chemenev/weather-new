<template>
  <form novalidate @submit.prevent.stop="submit">
    <input type="text" placeholder="Enter your city" v-model="enterCity" />
    <button type="submit">Submit</button>
    <div class="currency-list" v-if="cityList.length > 0">
      <div
        class="currency-list__item"
        v-for="(city, index) in cityList"
        :key="index"
        @click="currenCity(city)"
      >
        {{ city }}
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      enterCity: '',
    };
  },
  created() {
    this.enterCity = this.value;
  },
  computed: {
    ...mapGetters('weather', ['cityList']),
  },
  methods: {
    ...mapActions('weather', ['fetchWeather']),
    submit() {
      if (this.enterCity) {
        this.fetchWeather(this.enterCity);
        this.enterCity = '';
      }
    },
    currenCity(value) {
      this.enterCity = value;
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
  margin: 2vh 0 0;
}

input[type='text'] {
  flex-basis: 85%;
  font-size: 18px;
  color: #000;
  border: 2px solid #000;
  padding: 20px;
  transition: border-color 0.4s;
}

input[type='text']::placeholder {
  text-transform: uppercase;
  font-size: 18px;
  color: #000;
}

input[type='text']:focus {
  border-color: #ec6e4c;
  outline: none;
}

button {
  flex-basis: 14%;
  cursor: pointer;
  background: #ec6e4c;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  border: none;
  transition: background 0.4s, color 0.4s;
}

button:hover {
  background: #fafafa;
  color: #000;
}

button:active {
  background: #000;
  color: #fafafa;
}

.currency-list {
  display: flex;
  margin-bottom: 15px;
  width: 100%;
}
.currency-list__item {
  padding: 15px 20px;
  background: #fafafa;
  margin-right: 15px;
  cursor: pointer;
  transition: background 0.4s, color 0.4s;
}

.currency-list__item:hover {
  background: #ec6e4c;
  color: #fff;
}

.currency-list__item:active {
  background: #000;
  color: #fafafa;
}
</style>
