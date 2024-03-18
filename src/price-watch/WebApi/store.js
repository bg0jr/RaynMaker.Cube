const fs = require('fs')
const path = require('path')

const configHome = process.env.RAYNMAKER_CONFIG

// id is CoinMarketCap internal ID
let coins = [
  { name: 'Bitcoin', id: '1' },
  { name: 'Etherium', id: '1027' },
  { name: 'Cardano', id: '2010' }
]

let stocks = [{ name: 'Siemens', id: 'SIE.XETRA'}]

if (configHome) {
  const fullPath = path.join(configHome, 'price-watch.json')

  if (fs.existsSync(fullPath)) {
    const rawData = fs.readFileSync(fullPath)
    
    config = JSON.parse(rawData)
    coins = config.coins
    stocks = config.stocks

    console.log('Config loaded from', fullPath)
  } else {
    console.log('No configuration found at', fullPath)
  }
}

exports.coins = coins
exports.stocks = stocks
