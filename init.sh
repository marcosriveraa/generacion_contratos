#!/bin/bash

mkdir -p /var/www/html/contratos_firmados /var/www/html/logs
mkdir -p /var/www/html/pendientes_firma /var/www/html/logs

chown -R www-data:www-data /var/www/html/contratos_firmados /var/www/html/logs
chown -R www-data:www-data /var/www/html/pendientes_firma /var/www/html/logs

chmod -R 777 /var/www/html/contratos_firmados /var/www/html/logs
chmod -R 777 /var/www/html/pendientes_firma /var/www/html/logs

chmod -R 777 ./html 

exec apache2-foreground
