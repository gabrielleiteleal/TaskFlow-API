package com.gabriel.gerenciadortarefas.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.gabriel.gerenciadortarefas.model.Usuario;
import com.gabriel.gerenciadortarefas.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

	private UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@Operation(description = "Retorna uma lista com todos os usuarios.")
	@ApiResponse(responseCode = "200", description = "Sucesso ao retornar a lista.")
	@GetMapping
	public ResponseEntity<List<Usuario>> listarUsuarios() {
		return ResponseEntity.status(200).body(usuarioService.listarUsuarios());
	}

	@Operation(description = "Cadastra o usuário (Não é necessário passar o 'id').")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso."),
			@ApiResponse(responseCode = "500", description = "Já existe um usuário com este e-mail.") })
	@PostMapping("/cadastro")
	public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
		return ResponseEntity.status(201).body(usuarioService.criarUsuario(usuario));
	}

	@Operation(description = "Editar o usuário (Necessário passar o 'id').")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Usuário editado com sucesso."),
			@ApiResponse(responseCode = "500", description = "Este e-mail já está cadastrado.") })
	@PutMapping
	public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
		return ResponseEntity.status(200).body(usuarioService.editarUsuario(usuario));
	}

	@Operation(description = "Deletar usuário pelo 'id'.")
	@ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Usuário deletado com sucesso."),
			@ApiResponse(responseCode = "405", description = "'id' não foi informado.") })
	@DeleteMapping("/{id}")
	public ResponseEntity<?> excluirUsuario(@PathVariable Integer id) {
		usuarioService.excluirUsuario(id);
		return ResponseEntity.status(204).build();
	}

	@Operation(description = "Validar login do usuário (Somente email e senha)")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Dados válidos"),
			@ApiResponse(responseCode = "401", description = "Dados inválidos") })
	@PostMapping("/validacao")
	public ResponseEntity<?> validarUsuario(@RequestBody Usuario usuario, HttpSession session) {
		Boolean senhaValida = usuarioService.validarUsuario(usuario.getEmail(), usuario.getSenha());
		Map<String, String> response = new HashMap<>();
		if (!senhaValida) {
			response.put("message", "Credenciais inválidas");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		Usuario usuarioEncontrado = usuarioService.buscarPorEmail(usuario.getEmail());
		session.setAttribute("usuarioLogado", usuarioEncontrado);
		response.put("redirectUrl", "/sistema");
		String redirect = "/sistema";
		return ResponseEntity.ok(Map.of("redirectUrl", redirect, "id", usuarioEncontrado.getId()));
	}
}