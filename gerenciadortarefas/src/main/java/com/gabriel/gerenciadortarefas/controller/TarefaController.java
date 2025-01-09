package com.gabriel.gerenciadortarefas.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gabriel.gerenciadortarefas.dto.TarefaDTO;
import com.gabriel.gerenciadortarefas.model.Tarefa;
import com.gabriel.gerenciadortarefas.model.Usuario;
import com.gabriel.gerenciadortarefas.service.TarefaService;
import com.gabriel.gerenciadortarefas.service.UsuarioService;

import jakarta.persistence.EntityManager;

@RestController
@CrossOrigin("*")
@RequestMapping("/tarefa")
public class TarefaController {

	private TarefaService tarefaService;
	private UsuarioService usuarioService;

	public TarefaController(TarefaService tarefaService, UsuarioService usuarioService) {
		this.tarefaService = tarefaService;
		this.usuarioService = usuarioService;
	}

	@GetMapping
	public ResponseEntity<List<Tarefa>> listarTarefas() {
		return ResponseEntity.status(200).body(tarefaService.listarTarefas());
	}

	@PostMapping("/criar")
	public ResponseEntity<?> criarTarefa(@RequestBody TarefaDTO tarefaDTO) {
		Tarefa tarefa = new Tarefa();
		tarefa.setTitulo(tarefaDTO.getTitulo());
		tarefa.setDescricao(tarefaDTO.getDescricao());
		tarefa.setStatus(tarefaDTO.getStatus());

		Usuario usuario = usuarioService.buscarPorId(tarefaDTO.getId_usuario());

		if (usuario == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado");
		}

		tarefa.setUsuario(usuario);

		tarefaService.criarTarefa(tarefa);

		return ResponseEntity.status(201).body(tarefaService.criarTarefa(tarefa));
	}

}
