const form = document.getElementById('formLogin');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

const URL_LOCAL = "http://localhost:8080";
const URL_ONLINE = "https://taskflow-api-production.up.railway.app";

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	await validar();
})

async function validar() {

	if (email.value === "") {
		alert('Preencha o campo Email');
		email.focus();
		return false;
	} else if (senha.value === "") {
		alert('Preenca o campo Senha');
		senha.focus();
		return false;
	}

	try {
		const response = await fetch(`${URL_ONLINE}/usuario/validacao`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email.value,
				senha: senha.value
			})
		})

		console.log({
			email: email.value,
			senha: senha.value
		});

		if (response.ok) {
			notificacao("Login realizado com sucesso!!", "#4CAF50");
			const data = await response.json();
			const id_usuario = data.id;
			localStorage.setItem('id_usuario', id_usuario);
			console.log(data);
			console.log(data.redirectUrl);
			window.location.href = data.redirectUrl;
			limpar();
		} else {
			const errorData = await response.json();
			console.log('Erro: ', errorData.message);
			notificacao("Credenciais inválidas", "#DC3545")
		}

	} catch (error) {
		console.error('Erro ao fazer login: ', error);
		alert('Erro ao se conectar com o servidor');
	}
}

function notificacao(texto, cor){
	let notificacao = document.createElement("div");
	notificacao.classList.add("notificacao");
	notificacao.innerText = texto;
	notificacao.style.backgroundColor = cor;
	document.body.appendChild(notificacao);
	setTimeout(() => {
		notificacao.classList.add("fade-out");
		setTimeout(() => notificacao.remove(), 500);
	}, 3000);
}

function limpar() {
	email.value = "";
	senha.value = "";
}