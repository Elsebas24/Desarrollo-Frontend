# Desarrollo Frontend — 3er semestre

Proyectos de la materia Desarrollo Frontend (ISC, Universidad de Montemorelos).

> **Nota:** los proyectos con Node no incluyen la carpeta `node_modules`. Antes de correrlos hay que ejecutar `npm install` dentro de la carpeta del proyecto.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS) para los proyectos de React y el backend
- [Java JDK 26](https://jdk.java.net/) para el proyecto Spring Boot
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
