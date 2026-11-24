CREATE DATABASE IF NOT EXISTS biblioteca_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblioteca_db;

-- Para poder re-ejecutar el script desde cero
DROP TABLE IF EXISTS libros;

CREATE TABLE libros (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  titulo           VARCHAR(180) NOT NULL,
  autor            VARCHAR(120) NOT NULL,
  categoria        VARCHAR(60)  NOT NULL,
  anio_publicacion SMALLINT     NOT NULL,
  isbn             VARCHAR(20)  NOT NULL UNIQUE,
  editorial        VARCHAR(100) NOT NULL,
  paginas          SMALLINT     NOT NULL DEFAULT 100,
  sinopsis         TEXT         NOT NULL,
  disponible       TINYINT(1)   NOT NULL DEFAULT 1,
  fecha_registro   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO libros (titulo, autor, categoria, anio_publicacion, isbn,
                    editorial, paginas, sinopsis, disponible) VALUES
('Clean Code', 'Robert C. Martin', 'Ingeniería de Software', 2008, '978-0132350884', 'Prentice Hall', 464, 'Manual de buenas prácticas para escribir código legible, mantenible y profesional.', 1),
('Designing Data-Intensive Applications', 'Martin Kleppmann', 'Bases de Datos', 2017, '978-1449373320', 'O''Reilly Media', 611, 'Análisis profundo de arquitecturas distribuidas, replicación, particionamiento y consistencia.', 1),
('The Pragmatic Programmer', 'David Thomas y Andrew Hunt', 'Ingeniería de Software', 2019, '978-0135957059', 'Addison-Wesley', 352, 'Consejos prácticos y filosofías de desarrollo para evolucionar como ingeniero de software.', 1),
('Introduction to Algorithms', 'Thomas H. Cormen', 'Algoritmos', 2022, '978-0262046305', 'MIT Press', 1312, 'Texto de referencia sobre estructuras de datos, grafos, programación dinámica y complejidad.', 0),
('Computer Networking: A Top-Down Approach', 'James F. Kurose', 'Redes', 2021, '978-0136681557', 'Pearson', 800, 'Explicación de protocolos de red desde la capa de aplicación hasta la capa física.', 1),
('Don''t Make Me Think', 'Steve Krug', 'Diseño Web', 2014, '978-0321965516', 'New Riders', 216, 'Principios esenciales de usabilidad web e intuición en interfaces digitales.', 1),
('Eloquent JavaScript', 'Marijn Haverbeke', 'Desarrollo Web', 2024, '978-1718504103', 'No Starch Press', 456, 'Introducción moderna a JavaScript, programación asíncrona y manipulación del DOM.', 0),
('Cien años de soledad', 'Gabriel García Márquez', 'Literatura', 1967, '978-0307474728', 'Diana', 496, 'Crónica de la familia Buendía en el pueblo ficticio de Macondo a lo largo de siete generaciones.', 1);