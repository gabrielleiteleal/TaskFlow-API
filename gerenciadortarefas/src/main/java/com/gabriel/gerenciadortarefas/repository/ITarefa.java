package com.gabriel.gerenciadortarefas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gabriel.gerenciadortarefas.model.Tarefa;

public interface ITarefa extends JpaRepository<Tarefa, Integer> {
	List<Tarefa> findByUsuarioId(Integer id_usuario);
}
