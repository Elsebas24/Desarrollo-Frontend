# Catálogo de Libros (HTML, CSS, jQuery, PHP y MariaDB)

Catálogo interactivo sin recargas: búsqueda con debounce, filtros combinados,
alta de libros, cambio de disponibilidad y eliminación mediante una API REST.

## Instalación

1. Importa la base de datos:

   ```
   mysql -u root -p --default-character-set=utf8mb4 -e "source sql/schema.sql"
   ```

2. Copia `config/conexion.example.php` como `config/conexion.php`
   y pon tu contraseña.
3. Levanta el servidor:

   ```
   php -S localhost:8003
   ```

4. Abre http://localhost:8003

## API (`api/libros.php`)

| Método | Uso |
|---|---|
| GET | Lista y filtra: `q`, `categoria`, `disponible`, `orden`, `formato=csv` |
| POST | Registra un libro (JSON) |
| PUT | Alterna la disponibilidad (`{"id": 1}`) |
| DELETE | Elimina: `?id=1` |

## Retos implementados

- **A. Ordenamiento**: más recientes, año descendente o título A–Z.
- **B. ISBN duplicado**: responde HTTP 409 con mensaje amigable.
- **C. Exportar CSV**: descarga los libros con los filtros actuales.

## Corrección respecto a la guía

La búsqueda original reutilizaba el marcador `:q` tres veces. Con
`PDO::ATTR_EMULATE_PREPARES = false` eso provoca
`SQLSTATE[HY093]: Invalid parameter number`; se usan `:q1`, `:q2` y `:q3`.