package um.edu.mx.editor_texto_saas.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ParticipanteService {

    public record Participante(
            Long id,
            String name,
            int score80,
            int score20,
            String badgeUrl) {
    }

    private final List<Participante> participantes = List.of(
            new Participante(1L, "Simurg", 80, 20, "ins/SIMURGlogo.png"),
            new Participante(2L, "canX", 80, 20, "ins/canX.png"),
            new Participante(3L, "PHOENIX", 80, 20, "ins/file_00000000f7dc8230968b9e2fdb4cbc8c.png"),
            new Participante(4L, "ITHACA", 79, 20, "ins/ITHACA.png"),
            new Participante(5L, "LOGOS", 79, 20, "ins/imagen_2026-08-21_163550529.png"),
            new Participante(6L, "PEPE EL POLLO", 77, 20, "ins/sfLogo_Pepe_el_pollo-removebg-preview.png"),
            new Participante(7L, "VECTORCITOS", 75, 20, "ins/logo.jpg"),
            new Participante(8L, "TELEMETRICS", 74, 20, "ins/LOGOTELEMETRICS.jpeg"),
            new Participante(9L, "ZÉNIT", 73, 20, "ins/WhatsApp Image 2026-08-31 at 10.14.08 PM.jpeg"),
            new Participante(10L, "LOS LAIKOS", 71, 20, "ins/GrupoLosLaikos.jpeg"),
            new Participante(11L, "ORBITAL DROP SHOCK TROOPERS", 69, 20, "ins/IMG-20260824-WA0006.jpg"),
            new Participante(12L, "NoVa", 75, 20, "ins/NoVa.png"),
            new Participante(13L, "AJOLOTES", 48, 20, "ins/file_00000000afe88230bee3cdfdec65450d.png"),
            new Participante(14L, "PROYECTO HELLMARY", 44, 0, "ins/hellmary.png"),
            new Participante(15L, "AETHER", 10, 20, "ins/AetherLogo.jpeg"),
            new Participante(16L, "Eliu Lopez Noverola", 1, 0, ""));

    public List<Participante> listarTodos() {
        return participantes;
    }
}
