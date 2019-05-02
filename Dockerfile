FROM node:8 as base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

FROM nginx:1.15.7-alpine
COPY --from=base /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
#CMD [ "npm", "start" ]