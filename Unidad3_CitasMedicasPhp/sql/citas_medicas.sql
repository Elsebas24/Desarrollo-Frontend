-- =====================================================
-- Sistema de registro de citas médicas
-- Base de datos: citas_medicas (MySQL 5.7+ / 8.x / MariaDB 10.3+)
-- Usuario de prueba: admin / Admin123*
-- =====================================================

CREATE DATABASE IF NOT EXISTS citas_medicas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE citas_medicas;

-- Para poder re-ejecutar el script desde cero
DROP TABLE IF EXISTS citas;
DROP TABLE IF EXISTS pacientes;
DROP TABLE IF EXISTS medicos;
DROP TABLE IF EXISTS especialidades;
DROP TABLE IF EXISTS usuarios;

-- Usuarios que pueden entrar al sistema (login)
CREATE TABLE usuarios (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario       VARCHAR(50)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre        VARCHAR(100) NOT NULL,
  activo        TINYINT(1)   NOT NULL DEFAULT 1,
  creado_en     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_usuario (usuario)
) ENGINE=InnoDB;

-- Especialidades médicas
CREATE TABLE especialidades (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(80)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_especialidades_nombre (nombre)
) ENGINE=InnoDB;

-- Médicos (cada uno pertenece a una especialidad)
CREATE TABLE medicos (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100) NOT NULL,
  especialidad_id INT UNSIGNED NOT NULL,
  activo          TINYINT(1)   NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  KEY idx_medicos_especialidad (especialidad_id),
  CONSTRAINT fk_medicos_especialidad
    FOREIGN KEY (especialidad_id) REFERENCES especialidades (id)
) ENGINE=InnoDB;

-- Pacientes
CREATE TABLE pacientes (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(120) NOT NULL,
  telefono  VARCHAR(20)  NOT NULL,
  email     VARCHAR(120) NULL,
  creado_en TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_pacientes_telefono (telefono)
) ENGINE=InnoDB;

-- Citas
-- slot_activo vale 1 mientras la cita está 'agendada' y NULL si se
-- cancela. El índice único sobre (medico, fecha, hora, slot_activo)
-- impide dos citas activas en el mismo horario, pero permite volver
-- a usar el hueco cuando una cita se cancela.
CREATE TABLE citas (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  paciente_id     INT UNSIGNED NOT NULL,
  medico_id       INT UNSIGNED NOT NULL,
  especialidad_id INT UNSIGNED NOT NULL,
  fecha           DATE         NOT NULL,
  hora            TIME         NOT NULL,
  motivo          VARCHAR(255) NULL,
  estado          ENUM('agendada','cancelada') NOT NULL DEFAULT 'agendada',
  slot_activo     TINYINT GENERATED ALWAYS AS
                    (IF(estado = 'agendada', 1, NULL)) STORED,
  creado_por      INT UNSIGNED NULL,
  creado_en       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cita_slot (medico_id, fecha, hora, slot_activo),
  KEY idx_citas_fecha (fecha),
  CONSTRAINT fk_citas_paciente
    FOREIGN KEY (paciente_id) REFERENCES pacientes (id),
  CONSTRAINT fk_citas_medico
    FOREIGN KEY (medico_id) REFERENCES medicos (id),
  CONSTRAINT fk_citas_especialidad
    FOREIGN KEY (especialidad_id) REFERENCES especialidades (id),
  CONSTRAINT fk_citas_usuario
    FOREIGN KEY (creado_por) REFERENCES usuarios (id)
) ENGINE=InnoDB;

-- =====================================================
-- Datos de ejemplo
-- =====================================================

-- Usuario: admin / Admin123* (hash bcrypt de password_hash de PHP)
INSERT INTO usuarios (usuario, password_hash, nombre) VALUES
('admin', '$2y$10$6MvDi2648bdPaC1eUtV1fOJX14d33NTcLO8F0EB6MW3.rJpJyJWgG', 'Administrador');

INSERT INTO especialidades (nombre) VALUES
('Medicina General'),
('Cardiología'),
('Pediatría'),
('Dermatología'),
('Ginecología');

INSERT INTO medicos (nombre, especialidad_id) VALUES
('Dra. Laura Méndez', 1),
('Dr. Carlos Ramírez', 2),
('Dra. Ana Torres', 3),
('Dr. Jorge Salinas', 4),
('Dra. Patricia Núñez', 5),
('Dr. Luis Herrera', 1);

INSERT INTO pacientes (nombre, telefono, email) VALUES
('María Fernández', '8261234567', 'maria@example.com'),
('José Hernández', '8267654321', NULL);

-- Dos citas de ejemplo para HOY con la Dra. Laura Méndez (médico 1)
INSERT INTO citas (paciente_id, medico_id, especialidad_id,
                   fecha, hora, motivo, creado_por) VALUES
(1, 1, 1, CURDATE(), '10:00:00', 'Dolor de cabeza frecuente', 1),
(2, 1, 1, CURDATE(), '12:00:00', 'Chequeo general', 1);