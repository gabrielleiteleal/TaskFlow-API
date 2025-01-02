package com.gabriel.gerenciadortarefas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude= {SecurityAutoConfiguration.class})
public class GerenciadortarefasApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciadortarefasApplication.class, args);
	}

}
