package com.gabriel.gerenciadortarefas.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gabriel.gerenciadortarefas.dto.TarefaDTO;
import com.gabriel.gerenciadortarefas.model.Tarefa;
import com.gabriel.gerenciadortarefas.model.Usuario;
import com.gabriel.gerenciadortarefas.service.TarefaService;
import com.gabriel.gerenciadortarefas.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

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

	@Operation(description = "Retorna uma lista com todas as tarefas.")
	@ApiResponse(responseCode = "200", description = "Sucesso ao retornar a lista.")
	@GetMapping
	public ResponseEntity<List<Tarefa>> listarTarefas() {
		return ResponseEntity.status(200).body(tarefaService.listarTarefas());
	}

	@Operation(description = "Retorna a tarefa pelo 'id_tarefa'.")
	@ApiResponse(responseCode = "200", description = "Tarefa recuperada pelo 'id_tarefa'.")
	@GetMapping("/{id}")
	public ResponseEntity<Tarefa> recuperarTarefa(@PathVariable Integer id) {
		return ResponseEntity.status(200).body(tarefaService.recuperarTarefa(id));
	}

	@Operation(description = "Retorna todas as tarefas do usuário vinculado.")
	@ApiResponse(responseCode = "200", description = "Tarefas vinculadas com o usuário pelo 'id_usuario'.")
	@GetMapping("/usuario/{id_usuario}")
	public List<Tarefa> recuperarTarefaPorUsuario(@PathVariable Integer id_usuario) {
		return tarefaService.recuperarTarefaPorUsuario(id_usuario);
	}

	@Operation(description = "Cria tarefa relacionada com o usuário pelo 'id_usuario' (Não é necessário 'id_tarefa').")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso."),
			@ApiResponse(responseCode = "500", description = "Este usuário não existe.") })
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

	@Operation(description = "Edita as tarefas (Necessário passar 'id_tarefa' e 'id_usuario').")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Tarefa editada com sucesso."),
			@ApiResponse(responseCode = "500", description = "Informações da tarefa estão incorretas.") })
	@PutMapping("/editar")
	public ResponseEntity<?> editarTarefa(@RequestBody TarefaDTO tarefaDTO) {
		Tarefa tarefa = new Tarefa();
		tarefa.setId_tarefa(tarefaDTO.getId_tarefa());
		tarefa.setTitulo(tarefaDTO.getTitulo());
		tarefa.setDescricao(tarefaDTO.getDescricao());
		tarefa.setStatus(tarefaDTO.getStatus());
		Usuario usuario = usuarioService.buscarPorId(tarefaDTO.getId_usuario());
		if (usuario == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado");
		}
		tarefa.setUsuario(usuario);
		tarefaService.editarTarefa(tarefa);
		return ResponseEntity.status(201).body(tarefaService.editarTarefa(tarefa));
	}

	@Operation(description = "Deletar tarefa pelo 'id_tarefa'.")
	@ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Tarefa deletada com sucesso."),
			@ApiResponse(responseCode = "405", description = "'id_tarefa' não foi informado.") })

	@DeleteMapping("/{id}")
	public ResponseEntity<?> excluirTarefa(@PathVariable Integer id) {
		tarefaService.excluirTarefa(id);
		return ResponseEntity.status(204).build();
	}
}