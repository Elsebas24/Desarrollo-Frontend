# Inventario de componentes de robótica (PHP + MariaDB + jQuery)

CRUD completo de componentes (ESP32, sensores, motores, baterías…) con
login, búsqueda, filtros, paginación y vista lista/tarjetas guardada en cookie.

## Instalación

1. Importa la base de datos:

   ```
   mysql -u root -p --default-character-set=utf8mb4 -e "source sql/schema.sql"
   ```

2. Copia `includes/db_connect.example.php` como `includes/db_connect.php`
   y pon tu contraseña.
3. Levanta el servidor:

   ```
   php -S localhost:8001
   ```

4. Abre http://localhost:8001 y entra con **admin / Admin123***
   o **capitan / Robot2026***.

## Estructura

| Archivo | Función |
|---|---|
| `index.php` | Listado (Read), búsqueda GET, filtros, paginación y cookie de vista |
| `agregar.php` / `editar.php` | Create y Update con validación en servidor |
| `eliminar.php` | Delete (solo POST con token CSRF) |
| `login.php` / `logout.php` | Sesión con `password_verify()` |
| `includes/db_connect.php` | Conexión PDO |
| `includes/auth.php` | Sesión, CSRF y mensajes flash |
| `includes/funciones.php` | Funciones propias y consultas preparadas |
| `assets/js/app.js` | Modal de eliminar, filtros automáticos y validación en cliente |