<?php
namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class AuthController extends Controller {
    private User $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function showLogin(): void {
        if (isset($_SESSION['user_id'])) {
            $this->redirect('/');
        }
        $this->view('auth/login');
    }

    public function login(): void {
        $email = trim($_POST['email'] ?? '');
        $password = trim($_POST['password'] ?? '');

        $user = $this->userModel->findByEmail($email);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $this->redirect('/');
        }

        $this->view('auth/login', ['error' => 'Credenciales inválidas.']);
    }

    public function logout(): void {
        session_destroy();
        $this->redirect('/login');
    }
}
