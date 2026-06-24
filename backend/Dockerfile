FROM php:8.3-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# =========================
# Install system dependencies
# =========================
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath

# =========================
# Enable Apache mod rewrite
# =========================
RUN a2enmod rewrite

# =========================
# Install Composer
# =========================
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# =========================
# Set working directory
# =========================
WORKDIR /var/www/html

# =========================
# Copy project files
# =========================
#COPY . .

# =========================
# Install PHP dependencies
# =========================
#RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# =========================
# Set permissions
# =========================
#RUN chown -R www-data:www-data /var/www/html \
#    && chmod -R 755 /var/www/html/storage

#s =========================
# Apache document root (Laravel public)
# =========================
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

EXPOSE 80

CMD ["apache2-foreground"]