# Use official PHP 8.2 Apache image
FROM php:8.2-apache

# Install system dependencies and PostgreSQL PDO extension
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Enable Apache rewrite module for Laravel routing
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy all files from backend folder to container
COPY . .

# Install composer
RUN curl -sS https://getcomposer.org/installer | php
RUN php composer.phar install --no-dev --optimize-autoloader

# Set proper permissions for Laravel storage and bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80 for Apache
EXPOSE 80

# Run Laravel commands at runtime, after environment variables are available
CMD php artisan config:clear \
    && php artisan route:clear \
    && php artisan cache:clear \
    && php artisan key:generate \
    && php artisan migrate --force \
    && apache2-foreground
