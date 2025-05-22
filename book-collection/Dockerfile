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

# Enable mod_rewrite for single-page app routing (important for React Router)
RUN sed -i '/^#LoadModule rewrite_module/s/^#//' /usr/local/apache2/conf/httpd.conf

# Copy custom .htaccess for React routing
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

# Remove default HTML folder content
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy the built frontend into Apache's web root
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["httpd-foreground"]
