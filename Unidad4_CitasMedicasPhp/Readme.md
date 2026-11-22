# Sistema de citas médicas (PHP + MariaDB + jQuery)

Login, dashboard de módulos y agenda de citas en tarjetas.

## Instalación

1. Importa la base de datos:

   ```
   mysql -u root -p --default-character-set=utf8mb4 -e "source sql/citas_medicas.sql"
   ```

2. Copia `config/db.example.php` como `config/db.php` y pon tu contraseña.
3. Levanta el servidor:

   ```
   php -S localhost:8000
   ```

4. Abre http://localhost:8000 y entra con **admin / Admin123***.