
set API_KEY=<api-key>

curl -H "X-CMC_PRO_API_KEY: %API_KEY%" -H "Accept: application/json" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/map > CoinMarketCap.Listing.json


