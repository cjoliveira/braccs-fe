// @ts-nocheck
window.addEventListener('load', function () {
    var pagina = document.title;
    toggleBtnVoltar(pagina);


    if (pagina == 'Consulta de Usuário') {
        const device = getDeviceType();
        if (device === 'mobile') {
            displayCardListUsuario();
        } else {

            const larguraDaTela = window.innerWidth;

            if (larguraDaTela <= 810) {
                displayCardListUsuario();
            } else {
                displayTableUsuario();
            }

        }
    } else if (pagina == 'Consulta de Animais') {
        const device = getDeviceType();
        if (device === 'mobile') {
            displayCardListAnimal();
        } else {

            const larguraDaTela = window.innerWidth;

            if (larguraDaTela <= 810) {
                displayCardListAnimal();
            } else {
                displayTableAnimal();
            }

        }
    }

});

//Executar função ao redimencionar pagina
window.addEventListener('resize', function () {
    var pagina = document.title;

    if (pagina == 'Consulta de Usuário') {
        const device = getDeviceType();
        if (device === 'mobile') {
            displayCardListUsuario();
        } else {

            const larguraDaTela = window.innerWidth;

            if (larguraDaTela <= 810) {
                displayCardListUsuario();
            } else {
                displayTableUsuario();
            }

        }
    } else if (pagina == 'Consulta de Animais') {
        const device = getDeviceType();
        if (device === 'mobile') {
            displayCardListAnimal();
        } else {

            const larguraDaTela = window.innerWidth;

            if (larguraDaTela <= 810) {
                displayCardListAnimal();
            } else {
                displayTableAnimal();
            }

        }
    }
})


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
    window.location.href = 'relatorios.html';
});

btnCiclo?.addEventListener('click', function () {
    window.location.href = 'ciclo.html';
});

btnNovoUsuario?.addEventListener('click', function () {
    window.location.href = 'novo_usuario.html';
});

btnConsultarUsuario?.addEventListener('click', function () {
    window.location.href = 'consulta_usuario.html';
});

btnNovoAnimal?.addEventListener('click', function () {
    window.location.href = 'novo_animal.html';
});

btnConsultarAnimal?.addEventListener('click', function () {
    window.location.href = 'consulta_animal.html';
});

btnCompra?.addEventListener('click', function () {
    window.location.href = 'compra.html';
});

btnVenda?.addEventListener('click', function () {
    window.location.href = 'venda.html';
});


/**
 * Função para ativar/desativar botão re retornar
 * @param {*} pagina 
 */
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

/**
 * Função para retornar para a pag anterior
 */
function voltar() {
    history.back();
}


/**
 *! LÓGICAS DE NEGÓCIO
 */

//Criando objeto usuário
class Usuario {
    constructor(id, nome, perfil, cpf, email, status) {
        this.id = id;
        this.nome = nome;
        this.perfil = perfil;
        this.cpf = cpf;
        this.email = email;
        this.status = status;
    }
}

//Criando objeto animal
class Animal {
    constructor(id, tipo, genero, dtNasc, dtCad, dimensao, peso, status) {
        this.id = id;
        this.tipo = tipo;
        this.genero = genero;
        this.dtNasc = dtNasc;
        this.dtCad = dtCad;
        this.dimensao = dimensao;
        this.peso = peso;
        this.status = status;
    }
}


//função para identificar o tipo de device 
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}

//Função para gerar dados mockados
function generateUsuarioMockData() {
    const mockData = [];

    for (let i = 1; i <= 10; i++) {
        const id = i;
        const nome = 'Usuário ' + i;
        const perfil = 'Usuário';
        const cpf = '000.000.000-00';
        const email = 'email@email.com';
        const status = 'Ativo';

        const usuario = new Usuario(id, nome, perfil, cpf, email, status);
        mockData.push(usuario);
    }

    return mockData;
}


function generateAnimalMockData() {
    const mockData = [];

    for (let i = 1; i <= 10; i++) {
        const id = i;
        const tipo = 'Vaca';
        const genero = 'Fêmea';
        const dtNasc = '01/01/2020';
        const dtCad = '15/01/2024';
        const dimensao = '30x40x20 cm';
        const peso = '5 kg';
        const status = 'Ativo';

        const animal = new Animal(id, tipo, genero, dtNasc, dtCad, dimensao, peso, status);
        mockData.push(animal);
    }

    return mockData;
}

async function retrieveAnimalData() {

    try {
        const response = await fetch('http://localhost:8080/gado/animal/buscar-animais', { method: 'GET' });
        const data = await response.json();
        console.log(data);
        const animalList = [];
        data.forEach(animal => {
            const animalObj = new Animal(animal.numId, animal.tipo, animal.genero, animal.dataNasc, animal.dataCadastro, animal.dimensao, animal.peso, animal.statusAtual);
            animalList.push(animalObj);
        });
        return animalList;
    } catch (error) {
        return console.log(error);
    }
}


//função para gerar dados em forma de cards - mobile
function displayCardListUsuario() {

    const cards = document.getElementById('card-list-usuarios');
    if (cards)
        cards.style.display = 'block';

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'none';

    const container = document.getElementById('card-list-usuarios');
    const mockData = generateUsuarioMockData();

    mockData.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `

                <div class='row'>
                    <h1>Id:</h1><h2>${usuario.id}</h2>
                    <h1 class = 'espaco-esq'>Perfil: </h1><h2>${usuario.perfil}</h2>
                </div>  
                
                <div class='row'>
                    <h1>Nome:</h1><h2>${usuario.nome}</h2>
                </div>  

                <div class='row'>
                    <h1>Email:</h1><h2>${usuario.email}</h2>
                </div> 

                <div class='row'>
                    <h1>CPF:</h1><h2>${usuario.cpf}</h2>
                    <h1 class = 'espaco-esq'>Status:</h1><h2>${usuario.status}</h2>
                </div>             
                
            </div>                       
        `;
        container?.appendChild(card);
    });
}



//função para gerar dados em forma de cards - mobile
function displayCardListAnimal() {

    const cards = document.getElementById('card-list-animais');
    if (cards)
        cards.style.display = 'block';

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'none';

    const container = document.getElementById('card-list-animais');
    const animalList = retrieveAnimalData();

    animalList.forEach(animal => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `

                <div class='row'>
                    <h1>Id:</h1><h2>${animal.id}</h2>
                    <h1 class = 'espaco-esq'>Perfil: </h1><h2>${animal.tipo}</h2>
                </div>  
                
                <div class='row'>
                    <h1>Nome:</h1><h2>${animal.genero}</h2>
                </div>  

                <div class='row'>
                    <h1>Email:</h1><h2>${animal.dtNasc}</h2>
                </div> 

                <div class='row'>
                    <h1>CPF:</h1><h2>${animal.dtCad}</h2>
                    <h1 class = 'espaco-esq'>Status:</h1><h2>${animal.dimensao}</h2>
                </div>             
                
            </div>                       
        `;
        container?.appendChild(card);
    });
}



//função para gerar dados em forma de tabela - devices médios e grandes
function displayTableUsuario() {

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'block';

    const cards = document.getElementById('card-list-usuarios');
    if (cards)
        cards.style.display = 'none';

    const container = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];
    const mockData = generateUsuarioMockData();

    const row = document.createElement('tr');
    row.innerHTML = '';

    mockData.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.perfil}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.email}</td>
            <td>${usuario.status}</td>
            <td><a href='#'>Visualizar</a></td>
        `;
        container?.appendChild(row);
    });
}

//função para gerar dados em forma de tabela - devices médios e grandes
async function displayTableAnimal(animalList) {

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'block';

    const cards = document.getElementById('card-list-animais');
    if (cards)
        cards.style.display = 'none';

    const container = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];
    if(animalList == null) {
        animalList = await retrieveAnimalData();
    }
    
    const row = document.createElement('tr');
    row.innerHTML = '';

    animalList.forEach(animal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${animal.id}</td>
            <td>${animal.tipo}</td>
            <td>${animal.genero}</td>
            <td>${new Date(animal.dtNasc).toLocaleDateString()}</td>
            <td>${new Date(animal.dtCad).toLocaleDateString()}</td>
            <td>${animal.dimensao}</td>
            <td>${animal.peso}</td>
            <td>${animal.status}</td>
            <td><a href='#'>Visualizar</a></td>
        `;
        container?.appendChild(row);
    });
}


/**
 *! CONSUMINDO API 
 */

/**
 * FUNÇÃO LOGIN DE SESSÃO
 */
const btnLogin = document.getElementById("btn-login");

btnLogin?.addEventListener('click', function () {
    const usuario = document.getElementById("username").value;
    const senha = document.getElementById("password").value;

    fetch('http://localhost:8080/gado/usuario/login?' + new URLSearchParams({
        login: usuario,
        senha: senha
    }), { method: 'POST' })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            alert('Usuário ou senha inválidos!');
            throw new Error('Erro na autenticação');
        }
    })
    .then(data => {
        console.log(data);
        redirectToAnotherPage()
    })
    .catch(error => console.log(error));
});  

const btnFiltroAnimal = document.getElementById("btn-filtro-animal");

btnFiltroAnimal?.addEventListener('click', function () {
    const filterText = document.getElementById("text-filtro-animal").value;
    const option = document.getElementById("selectOptions").value;

    fetch('http://localhost:8080/gado/animal/buscar-animais?' + new URLSearchParams({
        [option]: filterText
    }), { method: 'GET' })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            alert('Erro ao buscar animais!');
        }
    })
    .then(data => {
        console.log(data);
        const animalList = [];
        data.forEach(animal => {
            const animalObj = new Animal(animal.numId, animal.tipo, animal.genero, animal.dataNasc, animal.dataCadastro, animal.dimensao, animal.peso, animal.statusAtual);
            animalList.push(animalObj);
        });
        displayTableAnimal(animalList);
    })
    .catch(error => console.log(error));
});

const btnSaveUsuario = document.getElementById("btn-save-usuario");

btnSaveUsuario?.addEventListener('click', function () {

    const nome = document.getElementById('primeiro-nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const cpf = document.getElementById('cpf-rg').value;
    const pis = document.getElementById('pis-pasep').value;
    const dtNasc = document.getElementById('dt-nasc').value;
    const perfil = document.getElementById('options-perfil').value;
    const genero = document.getElementById('options-genero').value;
    const tel1 = document.getElementById('tel-1').value;
    const tel2 = document.getElementById('tel-2').value;
    const email = document.getElementById('email').value;

    if (nome && sobrenome && cpf && pis && dtNasc && perfil && genero && tel1 && tel2 && email) {
        saveUsuario(nome, sobrenome, cpf, pis, dtNasc, perfil, genero, tel1, email);
    }


});



//Salvando usuário no banco de dados
async function saveUsuario(nome, sobrenome, cpf, pis, dtNasc, perfil, genero, tel1, tel2, email) {

    const url = 'http://localhost:8080/gado/usuarios/salvar-usuario';

    // Parâmetros que serão enviados no corpo da solicitação POST
    const parametros = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        pis: pis,
        dtNasc: dtNasc,
        perfil: perfil,
        genero: genero,
        tel1: tel1,
        tel2: tel2,
        email: email,
    };

    // Configuração da solicitação POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indica que o corpo da solicitação é JSON
        },
        body: JSON.stringify(parametros) // Converte o objeto de parâmetros em JSON
    };

    // Realiza a solicitação POST
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocorreu um erro ao enviar a solicitação.');
            }
            return response.json(); // Converte a resposta JSON em um objeto JavaScript
        })
        .then(data => {
            console.log('Resposta da API:', data); // Exibe os dados retornados pela API
            // Faça algo com os dados retornados pela API
        })
        .catch(error => {
            console.error('Erro:', error);
        });


}



//buscando usuario no banco de dados
async function getUsuarios() {
    try {
        const response = await fetch('http://localhost:8080/gado/usuarios/buscar-usuarios');
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const data = await response.json();
        console.log(data);
        //! Faça algo com os dados recebidos da API
    } catch (error) {
        console.error('Erro:', error);
    }
}


//atualizando usua´rio no banco de dados
async function updateUsuario() {
    try {
        const response = await fetch('http://localhost:8080/gado/usuarios/atualizar-usuario/8');
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const data = await response.json();
        console.log(data);
        //! Faça algo com os dados recebidos da API
    } catch (error) {
        console.error('Erro:', error);
    }
}

//excluindo usuario do banco de dados
async function deleteUsuario() {
    try {
        const response = await fetch('http://localhost:8080/gado/usuarios/deletar-usuario/8');
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }
        const data = await response.json();
        console.log(data);
        //! Faça algo com os dados recebidos da API
    } catch (error) {
        console.error('Erro:', error);
    }
}