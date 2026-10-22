<?php
namespace App\Controllers;

use Core\Controller;
use App\Models\User;

class UserController extends Controller {
    private User $userModel;

    public function __construct() {
        if (!isset($_SESSION['user_id'])) {
            $this->redirect('/login');
        }
        $this->userModel = new User();
    }

    public function index(): void {
        $users = $this->userModel->all();
        $this->view('users/index', ['users' => $users]);
    }

    public function create(): void {
        $this->view('users/create');
    }

    public function store(): void {
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if ($name && $email && $password) {
            $this->userModel->create($name, $email, $password);
            $this->redirect('/');
        }

        $this->view('users/create', ['error' => 'Todos los campos son obligatorios.']);
    }

    public function delete(): void {
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $this->userModel->delete($id);
        }
        $this->redirect('/');
    }
}
