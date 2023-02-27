FROM node:10
# Create app directory
WORKDIR /app
# Copy package.json file
COPY package.json /app
# Install app dependencies
RUN npm install
# copy all folders
COPY . .
# Bundle app source
RUN npm run-script build
EXPOSE 8080
CMD ["node", "./dist/index.js"]