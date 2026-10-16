package um.edu.mx.editor_texto_saas.service;

import java.time.LocalDateTime;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import um.edu.mx.editor_texto_saas.model.Usuario;
import um.edu.mx.editor_texto_saas.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // Spring Security llama a este método al hacer login
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return User.withUsername(usuario.getUsername())
                .password(usuario.getPassword())
                .roles("USER")
                .build();
    }

    public Usuario registrar(String username, String password) {
        if (repository.existsByUsername(username)) {
            throw new IllegalStateException("El usuario ya existe");
        }
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setFechaRegistro(LocalDateTime.now());
        return repository.save(usuario);
    }
}
