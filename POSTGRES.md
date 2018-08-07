# Instalación General en el Servidor

Primeramente se necesita tener instalado ``` Postgres.```

#### Instalando Postgres
Para instalar Postgres se realizaron las instrucciones, basados en el siguiente enlace:
- Para sistemas operativos (Debian v.8)
> https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-9-4-on-debian-8

- Para sistemas operativos (Ubuntu v.16.04)
> https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04

- Para sistemas operativos (Centos 6)
> https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-6

Si no estas seguro de cual es el sistema operativo que tienes instalado o la version puedes saber escribiendo esta linea de comando en la terminal.

```
$ cat /etc/issue
```
Como se indica se ejecutaron los siguientes comandos:
```sh
$ sudo apt-get update
$ sudo apt-get install postgresql-9.4
$ sudo apt-get install postgresql-contrib postgresql-client-9.4
$ ps -ef | grep postgre
```
El último comando sólo es par comprobar la instalación.

##### Problemas en la Autenticación
Fuente:
> http://stackoverflow.com/questions/7695962/postgresql-password-authentication-failed-for-user-postgres

Al conectar con postgres, es posible que dispare el siguiente error:
```sh
$ psql -U postgres
Postgresql: password authentication failed for user “postgres”
ó
psql: FATAL:  la autentificación Peer falló para el usuario «postgres»
```
Si esto es así, se debe verificar los datos del siguiente archivo:
```sh
$ cd /etc/postgresql/9.4/main/
$ sudo nano pg_hba.conf
```
Como indica el enlace, la primera línea no comentada debería estar en peer o ident, en caso de que no sea así cambiarlo a estos valores, luego reiniciar el servicio:
```sh
$ sudo /etc/init.d/postgresql restart
```
Posteriormente, se procede a cambiar los datos del usuario postgres:
```sh
$ sudo -u postgres psql template1
$ ALTER USER postgres PASSWORD 'suContrasenia';
```
Después, volver al archivo de configuración de postgres y cambiar peer por md5:
```sh
$ cd /etc/postgresql/9.4/main/
$ sudo nano pg_hba.conf
```
Ejemplo:
```sh
> # DO NOT DISABLE!
> # If you change this first entry you will need to make sure that the
# database superuser can access the database using some other method.
# Noninteractive access to all databases is required during automatic
# maintenance (custom daily cronjobs, replication, and similar tasks).
#
# Database administrative login by Unix domain socket
local   all             postgres                                md5

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```
Reiniciar el servicio.
```sh
$ sudo /etc/init.d/postgresql restart
```
Con estos cambios ya es posible realizar la conexión con el siguiente comando:
```sh
$ psql -U postgres
Password for user postgres:
psql (9.4.6)
Type "help" for help.

postgres=#
```
Creando la base de datos

    $ sudo su
    $ su postgres
    $ su psql
    # CREATE DATABASE reclamos;

Lista las bases de datos existentes, verificar si [miDB] esta en la lista.

    # \l
    # \q
