package um.edu.mx.editor_texto_saas.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import um.edu.mx.editor_texto_saas.service.UsuarioService;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    public record RegistroRequest(String username, String password) {
    }

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    public ResponseEntity<Map<String, String>> registrar(@RequestBody RegistroRequest req) {
        String username = req.username() == null ? "" : req.username().trim();
        String password = req.password() == null ? "" : req.password();

        if (username.length() < 3 || username.length() > 50) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", "El usuario debe tener entre 3 y 50 caracteres"));
        }
        if (password.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", "La contraseña debe tener al menos 6 caracteres"));
        }

        try {
            service.registrar(username, password);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("mensaje", e.getMessage()));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("mensaje", "Usuario registrado"));
    }

    // Devuelve el usuario que inició sesión (para mostrarlo en el navbar)
    @GetMapping("/usuarios/yo")
    public Map<String, String> usuarioActual(Principal principal) {
        return Map.of("username", principal.getName());
    }
}
