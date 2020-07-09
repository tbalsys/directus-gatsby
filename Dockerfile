FROM node:14-alpine as gatsby
ARG DIRECTUS_URL
ENV DIRECTUS_URL $DIRECTUS_URL
ARG DIRECTUS_TOKEN
ENV DIRECTUS_TOKEN $DIRECTUS_TOKEN
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn && npx gatsby telemetry --disable
COPY . ./
RUN yarn build

FROM shelmangroup/darkhttpd
WORKDIR /public
COPY --from=gatsby /build/public .
CMD [".", "--no-listing"]
