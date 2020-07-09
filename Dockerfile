# Build Angular app
FROM node:latest as node
WORKDIR /app
COPY ./package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

#Publish on nginx
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/DEH-Dashboard /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# Run command to build DEH-Dashboard docker image 
    # docker build -t deh-dashboard .

# Run image locally 
    #docker run -p 8080:80 deh-dashboard

