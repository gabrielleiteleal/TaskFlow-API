package com.gabriel.gerenciadortarefas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.gerenciadortarefas.model.Usuario;

public interface IUsuario extends JpaRepository<Usuario, Integer> {
	Optional<Usuario> findByEmail(String email);
}