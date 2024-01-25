
window.addEventListener('load', function () {
    var tituloCompleto = document.title;
    toggleBtnVoltar(tituloCompleto);
});


function redirectToAnotherPage() {
    window.location.href = 'home.html';
}


//Função clique do botão "novo usuário"
const btnRelatorios = document.getElementById("btn-relatorios");
const btnCiclo = document.getElementById("btn-ciclo");
const btnNovoUsuario = document.getElementById("btn-novo-usuario");
const btnConsultarUsuario = document.getElementById("btn-consultar-usuario");
const btnNovoAnimal = document.getElementById("btn-novo-animal");
const btnConsultarAnimal = document.getElementById("btn-consultar-animal");
const btnCompra = document.getElementById("btn-compra");
const btnVenda = document.getElementById("btn-venda");

btnRelatorios?.addEventListener('click', function () {
    navegar('relatorios');
});

btnCiclo?.addEventListener('click', function () {
    navegar('ciclo');
});

btnNovoUsuario?.addEventListener('click', function () {
    navegar('novo_usuario');
});

btnConsultarUsuario?.addEventListener('click', function () {
    navegar('usuarios');
});

btnNovoAnimal?.addEventListener('click', function () {
    navegar('novo_animal');
});

btnConsultarAnimal?.addEventListener('click', function () {
    navegar('animais');
});

btnCompra?.addEventListener('click', function () {
    navegar('compra');
});

btnVenda?.addEventListener('click', function () {
    navegar('venda');
});


//Função para navegar para outra página
/**
 * @param {string} pagina
 */
function navegar(pagina) {
    window.location.href = pagina + '.html';
}

function voltar() {
    history.back();
}

function toggleBtnVoltar(pagina) {
    const btnVoltar = document.getElementById("btn-voltar");
    if (pagina == 'Home - Sutero') {
        if (btnVoltar)
            btnVoltar.style.display = 'none';
    } else {
        if (btnVoltar)
            btnVoltar.style.display = 'inline-block';
    }
}
