# Stage 1: Serve the application in production
FROM nginx:alpine

# Copy the pre-built application
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]