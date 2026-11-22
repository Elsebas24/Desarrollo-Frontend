-- =====================================================
-- Inventario de componentes de robótica
-- Base de datos: inventario_robotica (MariaDB 10.3+ / MySQL 8)
-- Usuarios de prueba: admin / Admin123*   ·   capitan / Robot2026*
-- =====================================================

CREATE DATABASE IF NOT EXISTS inventario_robotica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inventario_robotica;

-- Para poder re-ejecutar el script desde cero
DROP TABLE IF EXISTS componentes;
DROP TABLE IF EXISTS proveedores;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

-- Usuarios que pueden entrar al sistema
CREATE TABLE usuarios (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario       VARCHAR(50)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre        VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_usuario (usuario)
) ENGINE=InnoDB;

-- Categorías de componentes (1 categoría → N componentes)
CREATE TABLE categorias (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(60)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_nombre (nombre)
) ENGINE=InnoDB;

-- Proveedores (1 proveedor → N componentes)
CREATE TABLE proveedores (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(80)  NOT NULL,
  sitio_web VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_proveedores_nombre (nombre)
) ENGINE=InnoDB;

-- Componentes del inventario
CREATE TABLE componentes (
  id            INT UNSIGNED      NOT NULL AUTO_INCREMENT,
  nombre        VARCHAR(120)      NOT NULL,
  categoria_id  INT UNSIGNED      NOT NULL,
  proveedor_id  INT UNSIGNED      NULL,
  fabricante    VARCHAR(80)       NOT NULL,
  modelo        VARCHAR(80)       NULL,
  cantidad      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  precio        DECIMAL(10,2)     NOT NULL DEFAULT 0.00,
  ubicacion     VARCHAR(60)       NULL,
  datasheet_url VARCHAR(255)      NULL,
  fecha_compra  DATE              NULL,
  creado_en     TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_componentes_nombre (nombre),
  CONSTRAINT fk_componentes_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias (id),
  CONSTRAINT fk_componentes_proveedor
    FOREIGN KEY (proveedor_id) REFERENCES proveedores (id)
    ON DELETE SET NULL
) ENGINE=InnoDB;

-- =====================================================
-- Datos de ejemplo
-- =====================================================

INSERT INTO usuarios (usuario, password_hash, nombre) VALUES
('admin',   '$2y$10$6MvDi2648bdPaC1eUtV1fOJX14d33NTcLO8F0EB6MW3.rJpJyJWgG', 'Administrador'),
('capitan', '$2y$10$c1Nia1dG0I8zO6E16z2rGuunNtASCduDJTydeWlWBtNCpl41Wa1qO', 'Capitán del equipo');

INSERT INTO categorias (nombre) VALUES
('Microcontroladores'),
('Sensores'),
('Actuadores'),
('Energía'),
('Cables y conectores');

INSERT INTO proveedores (nombre, sitio_web) VALUES
('Mouser Electronics', 'https://www.mouser.mx'),
('DigiKey',            'https://www.digikey.com.mx'),
('AliExpress',         'https://www.aliexpress.com'),
('Steren',             'https://www.steren.com.mx');

INSERT INTO componentes
  (nombre, categoria_id, proveedor_id, fabricante, modelo,
   cantidad, precio, ubicacion, datasheet_url, fecha_compra) VALUES
('Placa de desarrollo ESP32',   1, 1, 'Espressif',  'ESP32-DevKitC-32E', 8,  210.00, 'Gaveta A1', 'https://www.espressif.com', '2026-08-15'),
('Raspberry Pi Pico W',         1, 2, 'Raspberry Pi', 'RP2040',          4,  145.50, 'Gaveta A1', 'https://www.raspberrypi.com', '2026-09-02'),
('Arduino Nano',                1, 3, 'Arduino',    'Nano V3',           6,   95.00, 'Gaveta A2', 'https://www.arduino.cc', '2026-06-20'),
('Sensor ultrasónico',          2, 3, 'Genérico',   'HC-SR04',          15,   38.00, 'Gaveta B1', NULL, '2026-07-10'),
('IMU 6 ejes',                  2, 1, 'InvenSense', 'MPU-6050',          5,   89.90, 'Gaveta B1', 'https://invensense.tdk.com', '2026-08-15'),
('Sensor de distancia láser',   2, 2, 'STMicroelectronics', 'VL53L0X',   4,  165.00, 'Gaveta B2', 'https://www.st.com', '2026-09-02'),
('Sensor de línea infrarrojo',  2, 3, 'Genérico',   'TCRT5000',         20,   18.50, 'Gaveta B2', NULL, '2026-07-10'),
('Motor DC con reductor',       3, 3, 'Pololu',     '25D 100:1',         8,  320.00, 'Caja C1',   'https://www.pololu.com', '2026-05-28'),
('Servomotor',                  3, 4, 'TowerPro',   'MG996R',            6,  135.00, 'Caja C1',   NULL, '2026-06-20'),
('Driver de motores',           3, 3, 'Genérico',   'L298N',             5,   75.00, 'Caja C2',   NULL, '2026-05-28'),
('Batería LiPo 3S 2200 mAh',    4, 1, 'Turnigy',    '3S1P 25C',          3,  480.00, 'Caja D1',   NULL, '2026-08-30'),
('Regulador buck',              4, 3, 'Genérico',   'LM2596',           10,   32.00, 'Gaveta D2', NULL, '2026-07-10'),
('Cables Dupont macho-hembra',  5, 4, 'Steren',     '40 piezas 20 cm',  12,   45.00, 'Gaveta E1', NULL, '2026-04-12'),
('Conector XT60',               5, 3, 'Amass',      'XT60H',            25,   12.00, 'Gaveta E2', NULL, '2026-08-30');