<template>
  <div>
    <enter-form />
    <weather-list />
  </div>
</template>

<script>
// @ is an alias to /src
import EnterForm from '@/components/EnterForm.vue';
import WeatherList from '@/components/WeatherList.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherList,
    EnterForm,
  },
};
</script>
