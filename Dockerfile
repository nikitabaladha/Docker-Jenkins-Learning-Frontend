# # Stage 1: Build React frontend using Node
# FROM node:22 AS builder

# # Set working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Optional: If you have an .env file for build
# COPY .env .env

# # Copy the rest of the app and build it
# COPY . .

# # RUN npm run build

# # Stage 2: Apache server to serve the static build
# # FROM httpd:2.4
# # RUN sed -i '/^#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

# # RUN rm -rf /usr/local/apache2/htdocs/*
# # COPY --from=builder /app/build/ /usr/local/apache2/htdocs/
# # EXPOSE 80
# # CMD ["httpd-foreground"]


FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy your React build to nginx's html folder
COPY dist/ /usr/share/nginx/html/

# Optional: custom config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]