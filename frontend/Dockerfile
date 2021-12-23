FROM node:16.10-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build -- --outputPath=./dist/out

FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html/
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
