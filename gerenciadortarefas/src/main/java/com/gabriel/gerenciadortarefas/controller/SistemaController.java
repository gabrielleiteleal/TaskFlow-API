package com.gabriel.gerenciadortarefas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.ui.Model;

//import com.gabriel.gerenciadortarefas.model.Usuario;
//import com.gabriel.gerenciadortarefas.service.UsuarioService;

//import jakarta.servlet.http.HttpSession;

@Controller
public class SistemaController {

	@GetMapping("/sistema")
	public String sistema() {

//		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
//
//		model.addAttribute("usuario", usuario);

		return "sistema";
	}

}
