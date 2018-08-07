# SISTEMA DE RECLAMOS CENTRO DE CONTACTO(BACKEND)

## Instalación de dependencias

**GIT**

> $ sudo apt-get install git

Para verificar la instalación: $ git --version

**CURL**

> $ sudo apt-get install curl

Para verificar la instalación: $ curl --version

**NODEJS**(>= 6.X.X)

> $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
>
> $ sudo apt-get install -y nodejs
>
> Para verificar la instalación: node --version

Para verificar la instalación: npm –version (>= 2.x.x)

## Clonar el repositorio

Clonar el proyecto desde GitLab

> $ git clone git@gitlab.geo.gob.bo:psanchez/reclamos-backend.git

Ingresar al directorio del proyecto clonado reclamos-backend

> $ cd reclamos-backend

## Configuracion del Proyecto

Ingresar al directorio config

> $ cd config/environment

Copiar el archivo development.js.sample a development.js y production.js.sample a production.js

> $ cp development.sample.js development.js

> $ cp production.sample.js production.js

Configuracion en desarrollo

> $ nano development.js

Configuracion en produccion

> $ nano production.js

## Instalación en Desarrollo

Instalar las dependencias del proyecto

> $ npm install

Iniciar el proyecto

> $ npm start

## Instalación en Produccion

Instalar las dependencias del proyecto

> $ npm install

_Configurar en APACHE

```json
<IfModule mod_ssl.c>
    <VirtualHost _default_:443>

            ProxyPreserveHost On

            # Servers to proxy the connection, or;
            # List of application servers:
            # Usage:

            ProxyPass / http://localhost:9000/
            ProxyPassReverse / http://localhost:9000/

            ServerName contacto.ddeduclpz.gob.bo

            ErrorLog ${APACHE_LOG_DIR}/error_ssl.log

            CustomLog ${APACHE_LOG_DIR}/access_ssl.log combined
            SSLEngine on
            SSLCertificateFile      /etc/ssl/certs/ssl-cert-snakeoil.pem
                SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key
    </VirtualHost>
</IfModule>
```

## Instalar PM2

> $ npm install pm2
>
> $ pm2 start npm -- start
