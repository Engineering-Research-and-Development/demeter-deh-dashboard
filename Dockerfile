# Build Angular app
FROM node:14.19.1 as node 
WORKDIR /app
COPY ./package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

#Publish on nginx
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/demeter-deh-dashboard /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

# Run command to build DEH Dashboard docker image 
# docker build -t demeter-deh-dashboard .

# Run image locally 
# docker run -p 8080:80 demeter-deh-dashboard