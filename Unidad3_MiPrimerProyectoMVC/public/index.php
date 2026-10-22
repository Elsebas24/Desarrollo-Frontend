<?php
session_start();

require_once __DIR__ . '/../vendor/autoload.php';

use Core\Router;
use App\Controllers\AuthController;
use App\Controllers\UserController;

$router = new Router();

// Rutas de Autenticación
$router->get('/login', [AuthController::class, 'showLogin']);
$router->post('/login', [AuthController::class, 'login']);
$router->get('/logout', [AuthController::class, 'logout']);

// Rutas CRUD de Usuarios
$router->get('/', [UserController::class, 'index']);
$router->get('/users/create', [UserController::class, 'create']);
$router->post('/users/store', [UserController::class, 'store']);
$router->post('/users/delete', [UserController::class, 'delete']);

$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
