package com.gabriel.gerenciadortarefas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.gabriel.gerenciadortarefas.model.Usuario;

import jakarta.servlet.http.HttpSession;

@Controller
public class SistemaController {

	@GetMapping("/sistema")
	public String sistema(HttpSession session, Model model) {

		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");

		model.addAttribute("usuario", usuario);

		return "sistema";
	}

}
