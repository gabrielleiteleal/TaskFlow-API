const formTarefa = document.getElementById('formTarefa');
const tituloTarefa = document.getElementById('tituloTarefa');
const descTarefa = document.getElementById('descTarefa');
const statusTarefa = document.getElementById('statusTarefa');
const id_usuario = localStorage.getItem('id_usuario');

function novaTarefa(){

	const novaTarefa = document.getElementById('novaTarefa');
	const janela = document.getElementById('janela-tarefas');
	const fechar = document.getElementById('fechar-janela');

	novaTarefa.onclick = function() {
		janela.style.display = "block";
	}

	fechar.onclick = function() {
		janela.style.display = "none";
	}

	//	window.onclick = function(event) {
	//		if(event.target == janela){
	//			janela.style.display = "none";
	//		}
	//	}

}

function editarTarefa(){

	const editarTarefa = document.getElementById('editarTarefa');
	const janela = document.getElementById('janela-tarefas');
	const fechar = document.getElementById('fechar-janela');

	editarTarefa.onclick = function() {
		janela.style.display = "block";
	}

	fechar.onclick = function() {
		janela.style.display = "none";
	}

	//	window.onclick = function(event) {
	//		if(event.target == janela){
	//			janela.style.display = "none";
	//		}
	//	}

}

async function criarTarefa() {

	if (tituloTarefa === "") {
		alert('Preencha o campo Título!');
		titulo.focus();
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
			alet('Nova tarefa adicinonada com sucesso!');
		} else {
			const errorData = await response.json();
			console.log('Erro: ', errorData.message);
			alert('tafera nao adicionada');
		}


	} catch (error) {
		console.log('Erro ao criar nova tarefa: ' + error);
		alert('Erro ao se conectar com a API');
	}

}

async function editarTarefa() {
	
	novaTarefa();

	if (tituloTarefa === "") {
		alert('Preencha o campo Título!');
		titulo.focus();
		return false;
	}


	try {

		const response = await fetch('http://localhost:8080/tarefa/editar', {
			method: 'PUT',
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
			alet('Tarefa editada com sucesso!');
		} else {
			const errorData = await response.json();
			console.log('Erro: ', errorData.message);
			alert('tafera não editada');
		}


	} catch (error) {
		console.log('Erro ao editar tarefa: ' + error);
		alert('Erro ao se conectar com a API');
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

//async function atualizarListaTarefas() {
//
//	const response = await fetch('http://localhost:8080/tarefa');
//	const tarefas = await response.json();
//
//	const tabelaTarefas = document.getElementById('table-bordered');
//	tabelaTarefas.innerHTML = '';
//	tabelaTarefas.innerHTML = `	
//						<thead>
//							<tr>
//								<th scope="col">Tarefas</th>
//								<th scope="col">Título</th>
//								<th scope="col">Descrição</th>
//								<th scope="col">Status</th>
//								<th scope="col">Edição</th>
//							</tr>
//						</thead>`;
//
//	tarefas.forEach(tarefas => {
//		const tr = document.createElement("tr");
//		tr.innerHTML = `		
//			<tr th:each="tarefas: ${tarefas}">
//			<td th:text="${tarefas.id_tarefa}"></td>
//			<td th:text="${tarefas.titulo}"></td>
//			<td th:text="${tarefas.descricao}"></td>
//			<td th:text="${tarefas.status}"></td>
//			<td>
//				<div>
//					<button class="editar">
//						<img src="../assets/icons/pencil-square.svg">
//					</button>
//					<button class="excluir" 
//					th:attr="data-id=${tarefas.id_tarefa}"
//					onclick="deletarTarefa(this)">
//					<img src="../assets/icons/trash3-fill.svg">
//					</button>
//				</div>
//			</td>
//		</tr>`;
//		tabelaTarefas.appendChild(tr);
//	});
//
//}

function sair() {
	window.location.replace('../index.html');
}