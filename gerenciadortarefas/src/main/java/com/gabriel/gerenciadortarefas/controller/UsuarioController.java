package com.gabriel.gerenciadortarefas.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
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

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

	private UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;

	}

	@GetMapping
	public ResponseEntity<List<Usuario>> listarUsuarios() {
		return ResponseEntity.status(200).body(usuarioService.listarUsuarios());
	}

	@PostMapping("/cadastro")
	public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
		return ResponseEntity.status(201).body(usuarioService.criarUsuario(usuario));
	}

	@PutMapping
	public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
		return ResponseEntity.status(200).body(usuarioService.editarUsuario(usuario));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> excluirUsuario(@PathVariable Integer id) {
		usuarioService.excluirUsuario(id);
		return ResponseEntity.status(204).build();
	}

	@PostMapping("/validacao")
	public ResponseEntity<?> validarUsuario(@RequestBody Usuario usuario) {
		Boolean senhaValida = usuarioService.validarUsuario(usuario.getEmail(), usuario.getSenha());
		Map<String, String> response = new HashMap<>();
//		HttpHeaders headers = new HttpHeaders();

		if (!senhaValida) {
			response.put("message", "Credenciais inválidas");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
		
		response.put("redirectUrl", "/usuario/sistema");
		
//		headers.setLocation(URI.create("/sistema"));
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/sistema")
	public String sistema() {
		return "sistema";
	}

}
