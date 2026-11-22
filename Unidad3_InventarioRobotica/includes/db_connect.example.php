<?php
// includes/db_connect.example.php - Cópialo como db_connect.php y pon tu contraseña

const DB_HOST = '127.0.0.1';
const DB_PORT = 3306;
const DB_NAME = 'inventario_robotica';
const DB_USER = 'root';
const DB_PASS = '';

function db(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST
             . ';port=' . DB_PORT
             . ';dbname=' . DB_NAME
             . ';charset=utf8mb4';

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            exit('No se pudo conectar a la base de datos: ' . $e->getMessage());
        }
    }

    return $pdo;
}