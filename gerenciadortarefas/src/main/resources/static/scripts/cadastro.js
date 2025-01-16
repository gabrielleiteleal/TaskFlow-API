const form = document.getElementById('formCadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	enviar();
})

async function enviar() {

	if (nome.value === "") {
		alert('Preencha o campo Nome');
		nome.focus();
		return false;
	} else if (email.value === "") {
		alert('Preencha o campo Email');
		email.focus();
		return false;
	} else if (senha.value === "") {
		alert('Preencha o campo Senha');
		senha.focus();
		return false;
	}


	try {
		const response = await fetch('http://localhost:8080/usuario/cadastro', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				nome: nome.value,
				email: email.value,
				senha: senha.value
			})
		});

		if (response.ok) {
			const data = response.json;
			alert('Cadastro realizado com sucesso');
			console.log(data);
			limpar();
			window.location.replace("../index.html");
		} else {
			alert('Este e-mail já existe');
		}



	} catch (error) {
		console.log("Erro ao se cadastrar: " + error);
		alert('Erro ao fazer cadastro');
	}

}

function limpar() {
	nome.value = "";
	email.value = "";
	senha.value = "";
}