<script setup>
import axios from 'axios'
import { ref } from 'vue'

const prices = ref([])

async function fetchCryptoPrices() {
  const api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com',
    withCredentials: false,
    headers: {
      'X-CMC_PRO_API_KEY': import.meta.env.COINMARKETCAP_API_KEY
    }
  })

  const coinMarketCapIds = {
    Bitcoin: 1,
    Etherium: 1027,
    Cardano: 2010,
    Polygon: 3890,
    Litecoin: 2,
    Harmony: 3945,
    Stellar: 512,
    VeChain: 3077,
    PolkaDot: 6636,
    ChainLink: 1975,
    Solana: 5426,
    ImmutableX: 3077
  }

  const { data } = await api.get('/v1/cryptocurrency/quotes/latest', {
    params: {
      id: Object.values(coinMarketCapIds).join(','),
      convert: 'EUR'
    }
  })

  Object.keys(coinMarketCapIds).forEach((coin) =>
    prices.push(`${coin}: ${data.data[coinMarketCapIds[coin]].quote.EUR.price}`)
  )
}

async function fetchStockPrices() {
  const api = axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    withCredentials: false,
  })

  const tickerSymbols = {
    BrookfieldRenewable: 'BEPC',
    Nel: 'D7G.XFRA',
    Siemens: 'SIE.XETRA',
    SiemensEnergy: 'ENR.XETRA',
    SiemensHealthineers: 'SHL.XFRA'
  }

  const { data } = await api.get('/eod/latest', {
    params: {
      access_key: import.meta.env.MARKETSTACK_API_KEY,
      symbols: Object.values(tickerSymbols).join(',')
    }
  })

  Object.keys(tickerSymbols).forEach((symbol) =>
    prices.push(`${symbol}: ${data.data.find((x) => x.symbol === tickerSymbols[symbol]).close}`)
  )
}

function fetch() {
  fetchCryptoPrices()
  fetchStockPrices()
}
</script>

<template>
  <main>
    <a href="#" @click="fetch">Fetch</a>
    <div>
      <div v-for="item in prices">{{ item }}</div>
    </div>
  </main>
</template>
