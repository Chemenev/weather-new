<template>
  <rates-form/>
    <div class="rates" v-if="currentRates !=''">
      <div class="rates__item" v-for="(rate, index) in currentRates" :key="index">
        <div class="rates__name">{{rate.symbol}}</div>
        <div class="rates__cost">{{rate.cost}}</div>
        <div class="rates__base">for 1 {{baseСurrency}}</div>
      </div>
    </div>
    <div v-else class="err">
        currency not selected
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RatesForm from '@/components/RatesForm.vue'

export default {

	components:{
		RatesForm
	},
	computed:{
...mapGetters('exchangeRates',['listRates','listRatesNames','currentRates','baseСurrency']),
	},
	methods:{

	}
}
</script>

<style scoped>
.rates {
  display: flex;
  flex-wrap: wrap;
  gap: 35px;
}
.rates__item {
  width: calc(100% / 6 - 30px);
  background: #FAFAFA;
  font-size: 20px;
	padding: 40px;
	transition: background .4s, color .4s;
}

.rates__item > * {
  margin: 10px 0px;
}

.rates__item:hover{
	background: #EC6E4C;
	color: #fff;
}

.rates__name {
  font-weight: 600;
  font-size: 1.2em;
}

.rates__cost {
  font-weight: 600;
  font-size: 1.5em;
}

.rates__base {
  opacity: 0.7;
}

.err{
	background: #FAFAFA;
  color: #EC6E4C;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 600;
}
</style>