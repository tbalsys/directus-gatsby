# Development

Run:

```
yarn
yarn develop
```

Go to:
http://localhost:8000

# Production

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
