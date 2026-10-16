package um.edu.mx.editor_texto_saas.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import um.edu.mx.editor_texto_saas.model.Documento;
import um.edu.mx.editor_texto_saas.repository.DocumentoRepository;

@Service
public class DocumentoService {

    private final DocumentoRepository repository;

    public DocumentoService(DocumentoRepository repository) {
        this.repository = repository;
    }

    public List<Documento> listarPorAutor(String autor) {
        return repository.findByAutor(autor);
    }

    public Optional<Documento> buscarPorId(Long id, String autor) {
        return repository.findByIdAndAutor(id, autor);
    }

    public Documento crear(Documento doc, String autor) {
        if (repository.existsByAutor(autor)) {
            throw new IllegalStateException("Solo puedes crear un documento por usuario");
        }
        doc.setAutor(autor);
        doc.setFechaCreacion(LocalDateTime.now());
        doc.setFechaModificacion(LocalDateTime.now());
        return repository.save(doc);
    }

    public Documento actualizar(Long id, Documento datos, String autor) {
        Documento doc = repository.findByIdAndAutor(id, autor)
                .orElseThrow(() -> new RuntimeException("Documento no encontrado"));
        doc.setTitulo(datos.getTitulo());
        doc.setContenido(datos.getContenido());
        doc.setFechaModificacion(LocalDateTime.now());
        return repository.save(doc);
    }

    public void eliminar(Long id, String autor) {
        repository.findByIdAndAutor(id, autor).ifPresent(repository::delete);
    }
}
