# CLAUDE.md

Monorepo de tareas de la materia "Desarrollo Frontend" (3er semestre, ISC, Universidad de Montemorelos). Cada carpeta `UnidadN_Nombre/` de la raíz es un **proyecto independiente**. No hay package.json en la raíz, ni build compartido, ni dependencias compartidas. Siempre hay que entrar (`cd`) a la carpeta del proyecto antes de correr cualquier cosa.

## Convenciones

- **Idioma:** los identificadores, comentarios, textos de la interfaz, READMEs y mensajes de commit están en **español**. El código nuevo también va en español (por ejemplo `obtenerLibros`, `responder`, `escaparHtml`).
- **Nombres de carpeta:** `Unidad<N>_<NombreEnPascalCase>`. Ojo: los dos proyectos de Angular están en carpetas `Unidad3_*`, pero sus READMEs, los nombres de proyecto en `angular.json` y los commits dicen "Unidad 4". No renombrar las carpetas a menos que se pida.
- **Mensajes de commit:** los commits recientes usan `[U3] <Proyecto>: <descripción>`, en español.
- **README.md de la raíz:** es el índice de proyectos, con las instrucciones para correr cada uno. Al agregar o renombrar una carpeta de proyecto hay que actualizar su tabla (regla establecida en un commit anterior).
- El README de cada proyecto explica su instalación y, en la mayoría de las prácticas, los "retos" (desafíos extra) implementados. Al implementar un reto hay que agregarlo a esa lista.
- En la raíz se ignoran `node_modules/`, `dist/`, `build/`, `.env*` y `settings.json`. `Unidad1_SaasJava/target/` y `HELP.md` existen en local pero no están en git.

## Proyectos por tecnología

### HTML estático + Bootstrap 5 (abrir `index.html` directamente)
- `Unidad1_AprendiendoBoostrap`: un solo `index.html`.
- `Unidad1_LaboratorioRobotica`: `index.html`, `css/`, `Images/`.

### Spring Boot: `Unidad1_SaasJava`
- Java 26, Spring Boot 4.1.x, Maven wrapper. Paquete `um.edu.mx.editor_texto_saas` con `controller/ service/ repository/ model/ config/`.
- Correr: `mvnw.cmd spring-boot:run` (Windows) → http://localhost:8080. Pruebas: `mvnw.cmd test`.
- Base de datos H2 en memoria (`jdbc:h2:mem:editordb`, usuario `sa`, sin contraseña), con consola en `/h2-console`. Spring Security se configura en `config/SecurityConfig.java`.
- Las páginas estáticas están en `src/main/resources/static/`.

### React + Vite (Unidad 2)
`Unidad2_ReactEscolares`, `Unidad2_Aerolineas`, `Unidad2_EstacionMeteorologica`, `Unidad2_TiendaZapatos` (con Tailwind).
- React 19, Vite 8, JSX sin TypeScript. Algunos usan `lucide-react`.
- `npm install`, `npm run dev` (:5173), `npm run build`, `npm run lint` (ESLint). No tienen pruebas.
- Estructura típica: `src/components/`, `src/data/` (datos de ejemplo), `src/pages/`.

### Fullstack: `Unidad2_LabFullstackFrontend`
- `backend-api/`: Express 4 + cors, ESM (`"type": "module"`), lista de tareas en memoria, puerto **3000**. Rutas: `GET/POST /api/tareas` y `GET/PUT/DELETE /api/tareas/:id`. `npm start` o `npm run dev` (nodemon). `pruebas.http` tiene peticiones para REST Client.
- `frontend-react/`: Vite + React + Bootstrap, lint con `oxlint`. Tiene fijo `API_URL = 'http://localhost:3000/api/tareas'`.
- `frontend-bootstrap/`: cliente en JS puro para la misma API.
- El backend tiene que estar corriendo antes de usar cualquiera de los dos frontends.
- `Unidad2_LabFullstackFrontend/src/` es una **copia vieja y suelta** de `server.js` y de los componentes, distinta de los archivos reales. Los cambios van en `backend-api/` y `frontend-react/`.

### Angular 22: `Unidad3_GestorTareasAngular`, `Unidad3_DashboardAngular`
- Componentes standalone, con `app.routes.ts` y `app.config.ts`. Las pruebas corren con **Vitest** mediante `ng test` (los `*.spec.ts` están junto a cada componente).
- `npm install`, `npm start` / `ng serve` (:4200), `ng build`, `ng test`.
- Dashboard: `core/` (modelos, `DashboardService` con `httpResource`, `LayoutService`), `layout/`, `shared/` (tarjetas, tabla) y `pages/` (carga diferida con `loadComponent`). Los datos vienen de `public/data/dashboard.json` o `robot.json`, según `URL_DATOS` en `dashboard.service.ts`. Las gráficas usan Chart.js + ng2-charts.

### PHP + MariaDB + jQuery (Unidad 3)
| Proyecto | Puerto del README | Config de BD (ignorada en git) | Plantilla a copiar | SQL |
|---|---|---|---|---|
| `Unidad3_CitasMedicasPhp` | 8000 | `config/db.php` | `config/db.example.php` | `sql/citas_medicas.sql` |
| `Unidad3_InventarioRobotica` | 8001 | `includes/db_connect.php` | `includes/db_connect.example.php` | `sql/schema.sql` |
| `Unidad3_CatalogoLibros` | 8003 | `config/conexion.php` | `config/conexion.example.php` | `sql/schema.sql` |

- Instalación: importar el SQL (`mysql -u root -p --default-character-set=utf8mb4 -e "source sql/<archivo>.sql"`), copiar el `*.example.php` con el nombre real y poner la contraseña, y luego correr `php -S localhost:<puerto>` dentro de la carpeta del proyecto.
- **Nunca subir a git los archivos reales de configuración de la BD.** Cada proyecto tiene su propio `.gitignore` para ellos. Los cambios de credenciales van solo en las plantillas `.example.php`, con la contraseña vacía.
- Patrones comunes que debe seguir el código nuevo:
  - PDO con `ERRMODE_EXCEPTION`, `FETCH_ASSOC` y `ATTR_EMULATE_PREPARES => false`. Como la emulación está desactivada, **cada marcador con nombre solo puede aparecer una vez por consulta** (usar `:q1`, `:q2`, `:q3`, no repetir `:q`). Repetirlo provoca `SQLSTATE[HY093]`.
  - Siempre consultas preparadas. Si el ORDER BY depende de lo que manda el usuario, aceptar solo una lista de valores permitidos.
  - Los endpoints JSON envían `Content-Type: application/json; charset=utf-8`, responden `{ ok, ... }` y usan el código HTTP adecuado (por ejemplo 409 para un ISBN duplicado).
  - Escapar la salida: `e()` / `htmlspecialchars` en PHP y `escaparHtml()` en jQuery.
  - El login usa `password_verify()`. InventarioRobotica además tiene tokens CSRF y mensajes flash en `includes/auth.php`, y solo elimina por POST.
  - jQuery 3.7.1 se carga desde el CDN. Los frontends llaman a los endpoints `api/*.php` con `$.ajax`.
- `Unidad3_InventarioRobotica/prueba.php` es un script de prueba suelto, no forma parte de la app.

### PHP MVC: `Unidad3_MiPrimerProyectoMVC`
- MVC hecho a mano. `public/index.php` es el front controller (con reescritura en `.htaccess` de Apache). `core/Router.php` enruta `get`/`post` por ruta exacta hacia `[Controlador::class, 'metodo']`. `core/Controller.php` es la clase base. Carpetas `app/{Controllers,Models,Views,Config}`.
- Autoload PSR-4 de Composer (`App\` → `app/`, `Core\` → `core/`). La carpeta generada `vendor/` **sí está en git**. Después de agregar clases hay que correr `composer dump-autoload`.
- No tiene README propio (las instrucciones están en el README de la raíz). Se corre con `php -S localhost:8002 -t public` (o con Apache apuntando a `public/`). Esquema: `schema.sql` (BD `mvc_app`).
- La conexión está en `app/Config/Database.php`, que se ignora en git (`.gitignore` del proyecto). Se crea copiando `app/Config/Database.example.php` y poniendo la contraseña. Igual que en los otros proyectos PHP, las credenciales nunca se suben a git.

### React Native / Expo: `Unidad3_ReactNativeBibliaApp`
- Expo SDK 58, React Native 0.88, React 19.3, JS sin TypeScript. Leer primero su `AGENTS.md`: las APIs de Expo cambian en cada SDK, así que hay que revisar la documentación de esa versión en vez de confiar en la memoria, y agregar paquetes con `npx expo install`.
- App de una sola pantalla en `App.js` (no usa Expo Router, aunque el AGENTS.md genérico lo mencione). `src/api/biblia.js` consulta la API pública `https://bolls.life` (RV1960). El resto está en `src/components/`, `src/utils/` y `src/data/ejemplo.js`.
- `npm start` / `npx expo start`.

## Archivos que no son código
Los `.docx` (guías de laboratorio, por ejemplo `Laboratorio_React_Native_Biblia.docx` y `Unidad2_Aerolineas/Practica_*.docx`) son las instrucciones de cada práctica. Hay que leerlos cuando se necesiten los requisitos de una práctica.
