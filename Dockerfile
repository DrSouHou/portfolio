# ===================================================================
# Dockerfile — Production Web Server for Personal Engineering Portfolio
# Lightweight Nginx Alpine Image (~25MB Footprint)
# ===================================================================

FROM nginx:alpine

# Remove default static content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom high-performance Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets and frontend code
COPY . /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Healthcheck to monitor web server availability
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
