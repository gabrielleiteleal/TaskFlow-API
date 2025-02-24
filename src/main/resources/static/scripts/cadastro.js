const form = document.getElementById('formCadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

const URL_LOCAL = "http://localhost:8080";
const URL_ONLINE = "https://taskflow-api-production.up.railway.app";

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	await enviar();
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
		const response = await fetch(`${URL_ONLINE}/usuario/cadastro`, {
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