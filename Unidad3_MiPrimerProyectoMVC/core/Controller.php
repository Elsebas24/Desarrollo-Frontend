<?php
namespace Core;

abstract class Controller {
    protected function view(string $viewPath, array $data = []): void {
        extract($data);
        
        $filePath = __DIR__ . '/../app/Views/' . $viewPath . '.php';
        if (file_exists($filePath)) {
            require_once $filePath;
        } else {
            http_response_code(404);
            die("Vista no encontrada: {$viewPath}");
        }
    }

    protected function redirect(string $url): void {
        header("Location: {$url}");
        exit;
    }
}
