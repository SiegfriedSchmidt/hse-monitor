FROM node:lts-slim as builder

WORKDIR /app
COPY . /app
RUN npm ci && \
    npm run build

FROM nginx:stable
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/server.conf.template /etc/nginx/templates/server.conf.template
