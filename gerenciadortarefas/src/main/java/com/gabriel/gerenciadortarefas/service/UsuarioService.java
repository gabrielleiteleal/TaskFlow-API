package com.gabriel.gerenciadortarefas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gabriel.gerenciadortarefas.model.Usuario;
import com.gabriel.gerenciadortarefas.repository.IUsuario;

@Service
public class UsuarioService {

	private IUsuario repository;
	private PasswordEncoder passwordEncoder;

	public UsuarioService(IUsuario repository) {
		this.repository = repository;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	public List<Usuario> listarUsuarios() {
		List<Usuario> lista = repository.findAll();
		return lista;
	}

	public Usuario criarUsuario(Usuario usuario) {
		String encoder = passwordEncoder.encode(usuario.getSenha());
		usuario.setSenha(encoder);
		Usuario novoUsuario = repository.save(usuario);
		return novoUsuario;
	}

	public Usuario editarUsuario(Usuario usuario) {
		String encoder = passwordEncoder.encode(usuario.getSenha());
		usuario.setSenha(encoder);
		Usuario novoUsuario = repository.save(usuario);
		return novoUsuario;
	}

	public Boolean excluirUsuario(Integer id) {
		repository.deleteById(id);
		return true;
	}

	public Boolean validarUsuario(String email, String senha) {
		Optional<Usuario> usuarioOpcional = repository.findByEmail(email);
		if (usuarioOpcional.isPresent()) {
			String senhaArmezenada = usuarioOpcional.get().getSenha();
			System.out.println("Email recebido: " + email);
			System.out.println("Senha recebida: " + senha);
			return passwordEncoder.matches(senha, senhaArmezenada);
		}
		return false;
	}

	public Usuario buscarPorEmail(String email) {
		return repository.findByEmail(email).orElse(new Usuario());
	}

	public Usuario buscarPorId(int id) {
		return repository.findById(id).orElse(new Usuario());
	}
}