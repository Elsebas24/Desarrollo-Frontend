# Desarrollo Frontend — 3er semestre

Proyectos de la materia Desarrollo Frontend (ISC, Universidad de Montemorelos).

> **Nota:** los proyectos con Node no incluyen la carpeta `node_modules`. Antes de correrlos hay que ejecutar `npm install` dentro de la carpeta del proyecto.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS) para los proyectos de React, Angular, React Native y el backend
- [Java JDK 26](https://jdk.java.net/) para el proyecto Spring Boot
- [PHP 8](https://www.php.net/) y [MariaDB](https://mariadb.org/) para los proyectos de PHP
- [Expo Go](https://expo.dev/go) en el celular (opcional) para la app de React Native
- Un navegador web

## Proyectos

### Unidad 1

| Proyecto | Descripción | Cómo correrlo |
|---|---|---|
| [Unidad1_AprendiendoBoostrap](Unidad1_AprendiendoBoostrap) | Práctica de Bootstrap 5 | Abrir `index.html` en el navegador |
| [Unidad1_LaboratorioRobotica](Unidad1_LaboratorioRobotica) | Página del laboratorio de robótica con Bootstrap 5 | Abrir `index.html` en el navegador |
| [Unidad1_SaasJava](Unidad1_SaasJava) | Editor de texto SaaS con Spring Boot | Ver abajo |

### Unidad 2

| Proyecto | Descripción | Cómo correrlo |
|---|---|---|
| [Unidad2_ReactEscolares](Unidad2_ReactEscolares) | Práctica de React | `npm install` y `npm run dev` |
| [Unidad2_LabFullstackFrontend](Unidad2_LabFullstackFrontend) | Lista de tareas con backend Express + frontend React | Ver abajo |
| [Unidad2_Aerolineas](Unidad2_Aerolineas) | Sistema de reservación de vuelos | `npm install` y `npm run dev` |
| [Unidad2_EstacionMeteorologica](Unidad2_EstacionMeteorologica) | Estación meteorológica | `npm install` y `npm run dev` |
| [Unidad2_TiendaZapatos](Unidad2_TiendaZapatos) | Tienda de zapatos con Tailwind CSS | `npm install` y `npm run dev` |

### Unidad 3

| Proyecto | Descripción | Cómo correrlo |
|---|---|---|
| [Unidad3_MiPrimerProyectoMVC](Unidad3_MiPrimerProyectoMVC) | MVC en PHP puro: login y CRUD de usuarios | Ver abajo |
| [Unidad3_ReactNativeBibliaApp](Unidad3_ReactNativeBibliaApp) | App móvil para consultar la Biblia (RV1960) con Expo | `npm install` y `npx expo start` |
| [Unidad3_GestorTareasAngular](Unidad3_GestorTareasAngular) | Gestor de tareas con Angular 22 | `npm install` y `npm start` |
| [Unidad3_DashboardAngular](Unidad3_DashboardAngular) | Dashboard administrativo con Angular 22 y Chart.js | `npm install` y `npm start` |
| [Unidad3_CitasMedicasPhp](Unidad3_CitasMedicasPhp) | Sistema de citas médicas con PHP, MariaDB y jQuery | Ver abajo (puerto 8000) |
| [Unidad3_InventarioRobotica](Unidad3_InventarioRobotica) | CRUD de componentes de robótica con PHP, MariaDB y jQuery | Ver abajo (puerto 8001) |
| [Unidad3_CatalogoLibros](Unidad3_CatalogoLibros) | Catálogo de libros con API REST en PHP, MariaDB y jQuery | Ver abajo (puerto 8003) |

## Instrucciones detalladas

### Proyectos de React (Vite)

```bash
cd Unidad2_Aerolineas      # o el proyecto que se quiera correr
npm install
npm run dev
```

Después abrir la URL que aparece en la terminal (normalmente http://localhost:5173).

### Unidad1_SaasJava (Spring Boot)

```bash
cd Unidad1_SaasJava
./mvnw spring-boot:run     # en Windows: mvnw.cmd spring-boot:run
```

Abrir http://localhost:8080. La base de datos es H2 en memoria; su consola está en http://localhost:8080/h2-console (usuario `sa`, sin contraseña).

### Unidad2_LabFullstackFrontend (backend + frontend)

Se necesitan **dos terminales**, una para el backend y otra para el frontend:

```bash
# Terminal 1: backend (http://localhost:3000)
cd Unidad2_LabFullstackFrontend/backend-api
npm install
npm start
```

```bash
# Terminal 2: frontend
cd Unidad2_LabFullstackFrontend/frontend-react
npm install
npm run dev
```

El backend tiene que estar corriendo antes de usar el frontend.

### Proyectos de Angular

```bash
cd Unidad3_DashboardAngular   # o Unidad3_GestorTareasAngular
npm install
npm start                     # pruebas: npm test
```

Abrir http://localhost:4200.

### Unidad3_ReactNativeBibliaApp (Expo)

```bash
cd Unidad3_ReactNativeBibliaApp
npm install
npx expo start
```

Escanear el código QR con Expo Go, o presionar `w` para abrirla en el navegador. Necesita internet porque consulta la API de bolls.life.

### Proyectos de PHP + MariaDB (CitasMedicasPhp, InventarioRobotica, CatalogoLibros)

1. Importar la base de datos (el archivo `.sql` está en la carpeta `sql/` de cada proyecto):

   ```bash
   cd Unidad3_CatalogoLibros    # o el proyecto que se quiera correr
   mysql -u root -p --default-character-set=utf8mb4 -e "source sql/schema.sql"
   ```

2. Copiar el archivo de conexión de ejemplo con su nombre real y poner la contraseña de MariaDB:

   | Proyecto | Copiar | Como |
   |---|---|---|
   | CitasMedicasPhp | `config/db.example.php` | `config/db.php` |
   | InventarioRobotica | `includes/db_connect.example.php` | `includes/db_connect.php` |
   | CatalogoLibros | `config/conexion.example.php` | `config/conexion.php` |

3. Levantar el servidor y abrir la URL:

   ```bash
   php -S localhost:8003        # 8000 citas, 8001 inventario, 8003 catálogo
   ```

El README de cada proyecto tiene los usuarios de prueba y más detalles.

### Unidad3_MiPrimerProyectoMVC (PHP MVC)

1. Importar la base de datos:

   ```bash
   cd Unidad3_MiPrimerProyectoMVC
   mysql -u root -p --default-character-set=utf8mb4 -e "source schema.sql"
   ```

2. Copiar `app/Config/Database.example.php` como `app/Config/Database.php` y poner la contraseña de MariaDB.
3. Levantar el servidor:

   ```bash
   php -S localhost:8002 -t public
   ```

Abrir http://localhost:8002.
