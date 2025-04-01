FROM php:8.2-apache

# Habilitar mod_rewrite para Apache
RUN a2enmod rewrite

# Instalar las extensiones PDO y PDO_MySQL
RUN docker-php-ext-install pdo pdo_mysql

COPY init.sh /init.sh
RUN chmod +x /init.sh

# Copiar el código de la página web
COPY html /var/www/html

# Otorgar permisos correctos
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html


# Exponer el puerto 80 para el servidor web
EXPOSE 80

CMD ["/init.sh"]
