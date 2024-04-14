# RaynMaker.Cube

# Docker build for Raspberry PI

## Build

`docker buildx create --name pi-builder --use`

`docker buildx build --platform linux/arm64 -t price-watch:pi . --load`

# Deploy without registry

Save on development system

`docker save price-watch:pi --output price-watch.tar`

Copy over to PI, log in and run:

`docker stop price-watch` 
`docker rm price-watch` 
`docker load --input price-watch.tar`

## Run on PI

`docker run -d --restart=unless-stopped --name price-watch -p 8001:8001 -p 8002:8002 -v /home/me/raynmaker:/app/config -e "RAYNMAKER_CONFIG=/app/config" -e "COINMARKETCAP_API_KEY=<api-key>" -e "MARKETSTACK_API_KEY=<api-key>" price-watch:pi`

# SSL certificates

- follow https://github.com/sagardere/set-up-SSL-in-nodejs
- make sure to grant read permissions to "users"
