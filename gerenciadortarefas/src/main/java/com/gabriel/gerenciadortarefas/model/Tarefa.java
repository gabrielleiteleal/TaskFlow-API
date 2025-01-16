package com.gabriel.gerenciadortarefas.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tarefas")
public class Tarefa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_tarefa")
	private int id_tarefa;

	@Column(name = "titulo", length = 50, nullable = false)
	private String titulo;

	@Column(name = "descricao", length = 250)
	private String descricao;

	@Column(name = "status", length = 45)
	private String status;

	@ManyToOne
	@JoinColumn(name = "id_usuario", nullable = false)
	private Usuario usuario;

	public int getId_tarefa() {
		return id_tarefa;
	}

	public void setId_tarefa(int id_tarefa) {
		this.id_tarefa = id_tarefa;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
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

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public String toString() {
		return "Tarefa [id_tarefa=" + id_tarefa + ", titulo=" + titulo + ", descricao=" + descricao + ", status="
				+ status + ", id_usuario=" + usuario + "]";
	}

}
