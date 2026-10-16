package um.edu.mx.editor_texto_saas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import um.edu.mx.editor_texto_saas.service.ParticipanteService;
import um.edu.mx.editor_texto_saas.service.ParticipanteService.Participante;

@RestController
@RequestMapping("/api/participantes")
public class ParticipanteController {

    private final ParticipanteService service;

    public ParticipanteController(ParticipanteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Participante> listar() {
        return service.listarTodos();
    }
}
