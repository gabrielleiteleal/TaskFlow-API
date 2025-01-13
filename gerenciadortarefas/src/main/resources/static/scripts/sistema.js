const formTarefa = document.getElementById('formTarefa');
const tituloTarefa = document.getElementById('tituloTarefa');
const descTarefa = document.getElementById('descTarefa');
const statusTarefa = document.getElementById('statusTarefa');
const id_usuario = localStorage.getItem('id_usuario');
const janela = document.getElementById('janela-tarefas');
//const idTarefa = button.getAttribute('data-id');

function abrirJanela(acao, button = null) {


	const fechar = document.getElementById('fechar-janela');


	janela.style.display = "block";

	fechar.onclick = function() {
		janela.style.display = "none";
		formTarefa.reset();
	}

	if (acao === 'editar' && button) {
		const idTarefa = button.getAttribute('data-id');
		recuperarTarefa(idTarefa);
	}


	formTarefa.onsubmit = function(event) {
		event.preventDefault();

		if (acao === 'criar') {
			criarTarefa();

		} else if (acao === 'editar') {
			recuperarTarefa(idTarefa);
		}
	}

}

async function criarTarefa() {

	if (tituloTarefa.value.trim() === "") {
		alert('Preencha o campo Título!');
		tituloTarefa.focus();
		return false;
	}

	try {
		const response = await fetch('http://localhost:8080/tarefa/criar', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				titulo: tituloTarefa.value,
				descricao: descTarefa.value,
				status: statusTarefa.value,
				id_usuario: id_usuario
			})
		});

		console.log({ titulo: tituloTarefa.value, desc: descTarefa.value, status: statusTarefa.value, id: id_usuario })
		if (response.ok) {
			alert('Nova tarefa adicinonada com sucesso!');
			formTarefa.reset();
			janela.style.display = "none";
		} else {
			const errorData = await response.json();
			console.log('Erro: ', errorData.message);
			alert('tafera não adicionada');
		}

	} catch (error) {
		console.log('Erro ao criar nova tarefa: ' + error);
		alert('Erro ao se conectar com a API');
	}

}

async function editarTarefa(idTarefa) {

	//	recuperarTarefa(idTarefa);

	if (tituloTarefa.value.trim() === "") {
		alert('Preencha o campo Título!');
		tituloTarefa.focus();
		return false;
	}


	try {

		const response = await fetch('http://localhost:8080/tarefa/editar', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id_tarefa: idTarefa,
				titulo: tituloTarefa.value,
				descricao: descTarefa.value,
				status: statusTarefa.value,
				id_usuario: id_usuario
			})
		});

		console.log({ id_tarefa: idTarefa, titulo: tituloTarefa.value, desc: descTarefa.value, status: statusTarefa.value, id: id_usuario })
		if (response.ok) {
			alert('Tarefa editada com sucesso!');
			formTarefa.reset();
			janela.style.display = "none";
		} else {
			const errorData = await response.json();
			console.log('Erro: ', errorData.message);
			alert('tafera não editada');
		}


	} catch (error) {
		console.log('Erro ao editar tarefa: ' + error);
		alert('Erro ao se conectar com a API (editarTarefa())');
	}

}

async function deletarTarefa(button) {

	const id = button.getAttribute('data-id');

	let resposta = confirm("Confirmar exclusão da tarefa?")
	if (resposta === true) {

		try {

			const response = await fetch('http://localhost:8080/tarefa/' + id, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			});

			if (response.ok) {
				alert('Tarefa excluida com sucesso!');
				//				atualizarListaTarefas();
			} else {
				const errorData = await response.json();
				console.log('Erro: ', errorData.message);
				alert('Erro ao exlcuir tarefa');
			}

		} catch (error) {
			console.log('Erro ao excluir tarefa: ' + error);
			alert('Erro ao se conectar com a API');
		}

	}

}

async function recuperarTarefa(idTarefa) {

	try {
		const response = await fetch('http://localhost:8080/tarefa/' + idTarefa, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})

		if (response.ok) {
			const tarefa = await response.json();
			tituloTarefa.value = tarefa.titulo;
			descTarefa.value = tarefa.descricao;
			statusTarefa.value = tarefa.status;
			formTarefa.onsubmit = function(event) {
				event.preventDefault();
				editarTarefa(idTarefa);
			}

		} else {
			const errorData = await response.json();
			console.error('Erro ao recuperar tarefa: ', errorData.message);
			alert('Erro ao recuperar os dados da tarefa');
		}

	} catch (error) {
		console.error('Erro ao conectar-se com a API: ', error);
		alert('Erro ao se conectar com o servidor.');
	}

}

function atualizarStatus(selectElement) {

	const valorSelecionado = selectElement.value;
	const cell = selectElement.parentElement;

	cell.classList.remove('status-concluido', 'status-em-andamento', 'status-nao-iniciado');

	if (valorSelecionado === 'concluido') {
		cell.classList.add('status-concluido');
	} else if (valorSelecionado === 'em-andamento') {
		cell.classList.add('status-em-andamento');
	} else if (valorSelecionado === 'nao-iniciado') {
		cell.classList.add('status-nao-iniciado');
	}
}

function sair() {
	window.location.replace('../index.html');
}