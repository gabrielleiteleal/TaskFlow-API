const formTarefa = document.getElementById('formTarefa');
const tituloTarefa = document.getElementById('tituloTarefa');
const descTarefa = document.getElementById('descTarefa');
const statusTarefa = document.getElementById('statusTarefa');
const id_usuario = localStorage.getItem('id_usuario');
const janela = document.getElementById('janela-tarefas');
const janelaUsuario = document.getElementById('janela-usuario');

const URL_LOCAL = "http://localhost:8080";
const URL_ONLINE = "https://taskflow-api-production.up.railway.app";

function abrirJanela(acao, button = null) {

    const fechar = document.getElementById('fechar-janela');

    janela.style.display = "flex";
    janela.style.top = "50%";
    janela.style.transform = "translate(-50%, -50%)";
    janela.style.opacity = "1";
    janela.style.transition = "0.4s";

    fechar.onclick = function () {
        janela.style.top = "100%";
        janela.style.transform = "translate(-50%, 0)";
        janela.style.opacity = "0";
        janela.style.transition = "0.4s";
        formTarefa.reset();
    }

    if (acao === 'editar' && button) {
        const idTarefa = button.getAttribute('data-id');
        recuperarTarefa(idTarefa);
    }

    formTarefa.removeEventListener('submit', handleSubmit);
    formTarefa.addEventListener('submit', handleSubmit);

    async function handleSubmit(event) {

        event.preventDefault();

        if (acao === 'criar') {
            criarTarefa();

        } else if (acao === 'editar') {
            recuperarTarefa(idTarefa);
        }
    };
}

function abrirJanelaUsuario() {

    const fechar = document.getElementById('fechar-janela-usuario');

    janelaUsuario.style.display = "flex";
    janelaUsuario.style.top = "50%";
    janelaUsuario.style.transform = "translate(-50%, -50%)";
    janelaUsuario.style.opacity = "1";
    janelaUsuario.style.transition = "0.4s";

    fechar.onclick = function () {
        janelaUsuario.style.top = "100%";
        janelaUsuario.style.transform = "translate(-50%, 0)";
        janelaUsuario.style.opacity = "0";
        janelaUsuario.style.transition = "0.4s";
    }
}

async function criarTarefa() {

    if (tituloTarefa.value.trim() === "") {
        alert('Preencha o campo Título!');
        tituloTarefa.focus();
        return false;
    }


    try {
        const response = await fetch(`${URL_ONLINE}/tarefa/criar`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                titulo: tituloTarefa.value,
                descricao: descTarefa.value,
                status: statusTarefa.value,
                id_usuario: id_usuario
            })
        });

        console.log({
            titulo: tituloTarefa.value,
            desc: descTarefa.value,
            status: statusTarefa.value,
            id: id_usuario
        })
        if (response.ok) {
            notificacao("Tarefa criada com sucesso!!", "#4CAF50");
            formTarefa.reset();
            janela.style.display = "none";
        } else {
            notificacao("Tarefa não adicionada!", "#DC3545");
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
        }

    } catch (error) {
        console.log('Erro ao criar nova tarefa: ' + error);
        notificacao("Erro ao se conectar com a API");
    }


}

async function editarTarefa(idTarefa) {

    if (tituloTarefa.value.trim() === "") {
        alert('Preencha o campo Título!');
        tituloTarefa.focus();
        return false;
    }

    try {

        const response = await fetch(`${URL_ONLINE}/tarefa/editar`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id_tarefa: idTarefa,
                titulo: tituloTarefa.value,
                descricao: descTarefa.value,
                status: statusTarefa.value,
                id_usuario: id_usuario
            })
        });

        console.log({
            id_tarefa: idTarefa,
            titulo: tituloTarefa.value,
            desc: descTarefa.value,
            status: statusTarefa.value,
            id: id_usuario
        })
        if (response.ok) {
            notificacao("Tarefa editada com sucesso!!", "#4CAF50")
            formTarefa.reset();
            janela.style.display = "none";
        } else {
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
            notificacao("Tarefa não editada", "#DC3545");
        }

    } catch (error) {
        console.log('Erro ao editar tarefa: ' + error);
        notificacao("Erro ao se conectar com a API", "#DC3545");
    }
}

async function deletarTarefa(button) {

    const id = button.getAttribute('data-id');

    let resposta = confirm("Confirmar exclusão da tarefa?")
    if (resposta === true) {
        try {
            const response = await fetch(`${URL_ONLINE}/tarefa/` + id, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });

            if (response.ok) {
                notificacao("Tarefa excluída com sucesso!!", "#4CAF50");
            } else {
                const errorData = await response.json();
                notificacao("Erro ao excluir tarefa!", "#DC3545");
                console.log('Erro: ', errorData.message);
            }

        } catch (error) {
            console.log('Erro ao excluir tarefa: ' + error);
            notificacao("Erro ao se conectar com a API", "#DC3545");
        }
    }
}

async function recuperarTarefa(idTarefa) {

    try {
        const response = await fetch(`${URL_ONLINE}/tarefa/` + idTarefa, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })

        if (response.ok) {
            const tarefa = await response.json();
            tituloTarefa.value = tarefa.titulo;
            descTarefa.value = tarefa.descricao;
            statusTarefa.value = tarefa.status;
            formTarefa.onsubmit = function (event) {
                event.preventDefault();
                editarTarefa(idTarefa);
            }

        } else {
            const errorData = await response.json();
            console.error('Erro ao recuperar tarefa: ', errorData.message);
            notificacao("Erro ao recuperar dados da tarefa", "#DC3545");
        }

    } catch (error) {
        console.error('Erro ao conectar-se com a API: ', error);
        notificacao("Erro ao se conectar com a API", "#DC3545");
    }
}

function notificacao(texto, cor) {
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