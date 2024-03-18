# RaynMaker.Cube

# Docker build for Raspberry PI

## Build

`docker buildx create --name pi-builder --use`

`docker buildx build --platform linux/arm64 -t price-watch:pi . --load`

# Deploy without registry

Save on development system

`docker save price-watch:pi --output price-watch.tar`

Copy over to PI, log in and run:

`docker load --input price-watch.tar`

## Run on PI

`docker run -d --restart=unless-stopped --name price-watch -p 8001:8001 -v /home/me/raynmaker:/app/config -e "RAYNMAKER_CONFIG=/app/config" -e "COINMARKETCAP_API_KEY=<api-key>" -e "MARKETSTACK_API_KEY=<api-key>" price-watch:pi`
