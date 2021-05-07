FROM node:14.16.1-alpine3.10

# App
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# SOURCE
COPY . .

# Expose port
EXPOSE 80

CMD ["npm", "run", "dev"]
