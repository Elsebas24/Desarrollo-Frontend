package um.edu.mx.editor_texto_saas.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import um.edu.mx.editor_texto_saas.model.Documento;
import um.edu.mx.editor_texto_saas.service.DocumentoService;

@RestController
@RequestMapping("/api/documentos")
public class DocumentoController {

    private final DocumentoService service;

    public DocumentoController(DocumentoService service) {
        this.service = service;
    }

    // Principal = usuario que inició sesión; cada quien solo ve lo suyo
    @GetMapping
    public List<Documento> listar(Principal principal) {
        return service.listarPorAutor(principal.getName());
    }

    @GetMapping("/{id}")
    public Documento obtener(@PathVariable Long id, Principal principal) {
        return service.buscarPorId(id, principal.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Documento no encontrado"));
    }

    @PostMapping
    public Documento crear(@RequestBody Documento doc, Principal principal) {
        if (doc.getTitulo() == null || doc.getTitulo().isBlank()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }

        if (doc.getTitulo().length() > 100) {
            throw new IllegalArgumentException("El título no puede exceder 100 caracteres");
        }

        try {
            return service.crear(doc, principal.getName());
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Documento actualizar(@PathVariable Long id, @RequestBody Documento doc, Principal principal) {
        return service.actualizar(id, doc, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id, Principal principal) {
        service.eliminar(id, principal.getName());
    }
}
