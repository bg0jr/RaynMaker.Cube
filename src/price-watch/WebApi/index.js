const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = 8001

app.use(express.static('public'))
app.use(cors())

app.get('/api/crypto', async (req, res) => {
  const api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com',
    withCredentials: false,
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
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
    ImmutableX: 10603
  }

  const prices = []

  try {
    const { data } = await api.get('/v1/cryptocurrency/quotes/latest', {
      params: {
        id: Object.values(coinMarketCapIds).join(','),
        convert: 'EUR'
      }
    })

    Object.keys(coinMarketCapIds).forEach((coin) =>
      prices.push({
        name: coin,
        value: data.data[coinMarketCapIds[coin]].quote.EUR.price,
        currency: 'EUR'
      })
    )
  } catch (error) {
    prices.push({ error: error.message })
  }

  res.json(prices)
})

app.get('/api/stocks', async (req, res) => {
  const api = axios.create({
    baseURL: 'http://api.marketstack.com/v1/',
    withCredentials: false
  })

  const tickerSymbols = {
    BrookfieldRenewable: 'BEPC',
    Nel: 'D7G.XFRA',
    Siemens: 'SIE.XETRA',
    SiemensEnergy: 'ENR.XETRA',
    SiemensHealthineers: 'SHL.XFRA'
  }

  const prices = []

  try {
    const { data } = await api.get('/eod/latest', {
      params: {
        access_key: process.env.MARKETSTACK_API_KEY,
        symbols: Object.values(tickerSymbols).join(',')
      }
    })

    Object.keys(tickerSymbols).forEach((symbol) =>
      prices.push({
        name: symbol,
        value: data.data.find((x) => x.symbol === tickerSymbols[symbol]).close,
        currency: "EUR"
      })
    )
  } catch (error) {
    prices.push({ error: error.message })
  }

  res.json(prices)
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
