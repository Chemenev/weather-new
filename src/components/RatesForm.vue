<template>
  <form>
    <input
      type="text"
      v-model="rateName"
      @keydown.enter="add"
      placeholder="Enter currency name"
    />
    <div class="currency-list" v-if="rateName.length > 0">
      <div
        class="currency-list__item"
        v-for="(rate, index) in filteredRates()"
        :key="index"
        @click="addFromRateList(rate)"
      >
        {{ rate }}
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      rateName: '',
    };
  },
  computed: {
    ...mapGetters('exchangeRates', ['listRatesNames', 'listRates']),
  },
  methods: {
    ...mapMutations('exchangeRates', ['set', 'addRates']),
    add() {
      this.set({ rateName: this.rateName });
    },
    filteredRates() {
      const filteredRates = this.listRatesNames.filter((item) =>
        item.includes(this.rateName.toUpperCase())
      );
      return filteredRates.slice(0, 4);
    },
    addFromRateList(rate) {
      for (let value in this.listRates) {
        if (rate === value) {
          this.addRates({
            symbol: value,
            cost: this.listRates[value].toFixed(2),
          });
          /*      const obg = {};
          obg.symbol = value;
          obg.cost = this.listRates[value].toFixed(2);
          this.addRates(obg); */
          this.rateName = '';
        }
      }
    },
  },
};
</script>

<style scoped>
form {
  position: relative;
  margin: 2vh 0 65px;
}
input[type='text'] {
  width: 100%;
  font-size: 18px;
  color: #000;
  border: 2px solid #000;
  padding: 20px;
  transition: border-color 0.4s;
  margin-bottom: 15px;
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

.currency-list {
  display: flex;
  margin-bottom: 15px;
  position: absolute;
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
