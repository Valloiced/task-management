# Use official PHP 8.2 Apache image
FROM php:8.2-apache

# Install system dependencies and PostgreSQL PDO extension
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Enable Apache rewrite module and configure DocumentRoot
RUN a2enmod rewrite \
    && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf \
    && sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Set working directory to Laravel root
WORKDIR /var/www/html

# Copy application code
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php
RUN php composer.phar install --no-dev --optimize-autoloader

# Set proper permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose Apache port
EXPOSE 80

# Runtime commands: migrate first, then clear cache, generate key if missing, then start Apache
CMD bash -c "\
    php artisan migrate --force && \
    php artisan config:clear && \
    php artisan route:clear && \
    php artisan cache:clear && \
    if [ -z \"$(php artisan tinker --execute='echo env(\"APP_KEY\");')\" ]; then php artisan key:generate; fi && \
    apache2-foreground \
"
