# build stage

FROM node:18.17.0 as build-stage

# WORKDIR /src

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

# RUN yarn run build

EXPOSE 3000

CMD ["yarn", "dev"]
# production stage

# FROM nginx:stable-alpine as production-stage

# COPY ./nginx_config.conf /etc/nginx/conf.d/default.conf

# COPY --from=build-stage /app/build /usr/share/nginx/html

# COPY --from=build-stage /app/.env /usr/share/nginx/html/.env

# RUN apk add --update nodejs

# RUN apk add --update yarn


# WORKDIR /usr/share/nginx/htmlp

# EXPOSE 80

# CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]