# Stage 1: Build React frontend using Node
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Optional: If you have an .env file for build
COPY .env .env

# Copy the rest of the app and build it
COPY . .

RUN npm run build

# Stage 2: Apache server to serve the static build
FROM httpd:2.4
RUN sed -i '/^#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]
