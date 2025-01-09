function novaTarefa() {
	
	const novaTarefa = document.getElementById('novaTarefa');
	const janela = document.getElementById('janela-tarefas');
	const fechar = document.getElementById('fechar-janela');
	
	novaTarefa.onclick = function (){
		janela.style.display = "block";
	}
	
	fechar.onclick = function () {
		janela.style.display = "none";
	}
	
//	window.onclick = function(event) {
//		if(event.target == janela){
//			janela.style.display = "none";
//		}
//	}

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