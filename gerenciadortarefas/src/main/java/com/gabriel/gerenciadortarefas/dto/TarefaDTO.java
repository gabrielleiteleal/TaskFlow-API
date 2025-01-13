package com.gabriel.gerenciadortarefas.dto;

public class TarefaDTO {

	private Integer id_tarefa;
	private String titulo;
	private String descricao;
	private String status;
	private Integer id_usuario;

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Integer getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Integer id_usuario) {
		this.id_usuario = id_usuario;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getId_tarefa() {
		return id_tarefa;
	}

	public void setId_tarefa(Integer id_tarefa) {
		this.id_tarefa = id_tarefa;
	}

}
