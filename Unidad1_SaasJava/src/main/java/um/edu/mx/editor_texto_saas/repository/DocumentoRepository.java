package um.edu.mx.editor_texto_saas.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import um.edu.mx.editor_texto_saas.model.Documento;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {

    List<Documento> findByAutor(String autor);

    Optional<Documento> findByIdAndAutor(Long id, String autor);

    boolean existsByAutor(String autor);
}
