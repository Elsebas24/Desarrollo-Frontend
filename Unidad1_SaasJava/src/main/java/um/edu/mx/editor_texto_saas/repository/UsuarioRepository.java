package um.edu.mx.editor_texto_saas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import um.edu.mx.editor_texto_saas.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);
}
