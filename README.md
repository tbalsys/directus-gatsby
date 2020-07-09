[![Netlify Status](https://api.netlify.com/api/v1/badges/ab5a4a00-ea97-47a5-b0fd-572356e90367/deploy-status)](https://app.netlify.com/sites/directus-gatsby/deploys)

# Development

Run:

```
yarn
yarn develop
```

Go to:
http://localhost:8000

# Production docker image

Builds minimal webserver docker image using darkhttpd (one C file). Image size withot data: 88.4kB)

After every change to the source files run:

```
cp env .env
```

Add Directus server URL and token

```
docker-compose build
docker-compose up
```

Go to:
http://localhost:80
