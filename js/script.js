// @ts-nocheck
window.addEventListener('load', function () {
    var pagina = document.title;
    toggleBtnVoltar(pagina);

    if (pagina != 'Login - Sutero'){
        checkUser();
    }

    if (pagina == 'Login - Sutero') {
        clearPrefsUsuario()
    }
    
    
    if (pagina == 'Home - Sutero') {
        checkUser();
    }


    if (pagina == 'Home - Sutero') {
        checkUser();
    }

    if (pagina == 'Cadastro Usuário') {
        const canAccess = ['Fazendeiro', 'Administrador']
        if (!checkUserPermission(canAccess)) {
            this.alert('Você não tem permissão para acessar essa página!');
            redirectToAnotherPage()
        }
    }

    if (pagina == 'Consulta de Usuário') {
        const canAccess = ['Fazendeiro', 'Administrador']
        if (checkUserPermission(canAccess)) {
            const device = getDeviceType();
            if (device === 'mobile') {
                displayCardListUsuario();
            } else {
                displayTableUsuario();
            }
        } else {
            this.alert('Você não tem permissão para acessar essa página!');
            redirectToAnotherPage()
        }
    } 
    
    if (pagina == 'Consulta de Animais') {
        const canAccess = ['Fazendeiro', 'Administrador', 'Veterinário', 'Funcionário']
        if (checkUserPermission(canAccess)) {
            const device = getDeviceType();
            if (device === 'mobile') {
                displayCardListAnimal();
            } else {
                displayTableAnimal();
            }
        } else {
            this.alert('Você não tem permissão para acessar essa página!');
            redirectToAnotherPage()
        }
    }
 
    setInfoUsuario(pagina);

});

// Executar função ao redimencionar pagina
window.addEventListener('resize', function () {
    var pagina = document.title;

    if (pagina == 'Consulta de Usuário') {
        const canAccess = ['Fazendeiro', 'Administrador']
        if (checkUserPermission()) {
            const device = getDeviceType();
            if (device === 'mobile') {
                displayCardListUsuario();
            } else {
                displayTableUsuario();
            }
        } else {
            this.alert('Você não tem permissão para acessar essa página!');
            redirectToAnotherPage()
        }
    } else if (pagina == 'Consulta de Animais') {
        const canAccess = ['Fazendeiro', 'Administrador', 'Veterinário', 'Funcionário']
        if (checkUserPermission(canAccess)) {
            const device = getDeviceType();
            if (device === 'mobile') {
                displayCardListAnimal();
            } else {
                displayTableAnimal();
            }
        } else {
            this.alert('Você não tem permissão para acessar essa página!');
            redirectToAnotherPage()
        }
    }
})

// Funcao que seta informações do usuario logado
function setInfoUsuario(pagina) {
    //Setando informções do usuario
    if (pagina != 'Login - Sutero') {
        var usuarioLogado = getUsuario();
        var perfil = getPerfil();

        var usuario = document.getElementById("usuario");
        usuario.textContent = usuarioLogado + ' | ' + perfil;
    }
}

// Função para verificar se há usuário logado
function checkUser() {
    if (getUsuario() == null) {
        window.location.href = 'index.html';
    }
}

// Função para verificar permissão de usuário
function checkUserPermission(canAccess) {
    return canAccess.includes(getPerfil());
}

// Função para deslogar usuário
function logout() {
    clearPrefsUsuario();
    window.location.href = 'index.html';
}

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

function togglePriceField() {
    var checkBox = document.getElementById("isAnimalBuy");
    var priceField = document.getElementById("priceField");
    if (checkBox.checked == true){
        priceField.style.display = "block";
    } else {
        priceField.style.display = "none";
        document.getElementById("text-price-field").value = null;
    }
}
/**
 *! LÓGICAS DE NEGÓCIO
 */

//Criando objeto usuário
class Usuario {
    constructor(login, nome, perfil, cpf, email, dataCadastro) {
        this.login = login;
        this.nome = nome;
        this.perfil = perfil;
        this.cpf = cpf;
        this.email = email;
        this.dataCadastro = dataCadastro;
    }
}

//Criando objeto animal
class Animal {
    constructor(idAnimal, numId, numIdMae, tipo, genero, dtNasc, dtCad, peso, status) {
        this.idAnimal = idAnimal;
        this.numId = numId;
        this.numIdMae = numIdMae;
        this.tipo = tipo;
        this.genero = genero;
        this.dtNasc = dtNasc;
        this.dtCad = dtCad;
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
        const login = 'login' + i;
        const nome = 'Usuário ' + i;
        const perfil = 'Usuário';
        const cpf = '000.000.000-00';
        const email = 'email@email.com';
        const dataCadastro = '2023-01-01';

        const usuario = new Usuario(login, nome, perfil, cpf, email, dataCadastro);
        mockData.push(usuario);
    }

    return mockData;
}

function generateAnimalMockData() {
    const mockData = [];

    for (let i = 1; i <= 10; i++) {
        const idAnimal = i;
        const numId = i;
        const numIdMae = i + 1;
        const tipo = 'Vaca';
        const genero = 'Fêmea';
        const dtNasc = '01/01/2020';
        const dtCad = '15/01/2024';
        const peso = '5 kg';
        const status = 'Ativo';

        const animal = new Animal(idAnimal, numId, numIdMae, tipo, genero, dtNasc, dtCad, peso, status);
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
            const numIdMae = animal.mae ? animal.mae.numId : "";
            const animalObj = new Animal(animal.idAnimal, animal.numId, numIdMae, animal.tipo, animal.genero, animal.dataNasc, animal.dataCadastro, animal.peso, animal.statusAtual);
            animalList.push(animalObj);
        });
        return animalList;
    } catch (error) {
        return console.log(error);
    }
}

async function retrieveUsuarioData() {

    try {
        const response = await fetch('http://localhost:8080/gado/usuario/buscar-usuarios', { method: 'GET' });
        const data = await response.json();
        console.log(data);
        const usuarioList = [];
        data.forEach(usuario => {
            const usuarioObj = new Usuario(usuario.login, usuario.nome, usuario.perfil, usuario.cpf, usuario.emailUsuario, usuario.dataCadast);
            usuarioList.push(usuarioObj);
        });
        return usuarioList;
    } catch (error) {
        return console.log(error);
    }
}


// Função para gerar dados em forma de cards - mobile
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

// Função para gerar dados em forma de cards - mobile
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

// Função para gerar dados em forma de tabela - devices médios e grandes
async function displayTableUsuario(usuarioList) {

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'block';

    const cards = document.getElementById('card-list-usuarios');
    if (cards)
        cards.style.display = 'none';

    const container = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];

    container.innerHTML = '';
    
    if(usuarioList == null) {
        usuarioList = await retrieveUsuarioData();
    }
        
    const row = document.createElement('tr');
    row.innerHTML = '';

    usuarioList.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.login}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.perfil}</td>
            <td>${usuario.cpf}</td>
            <td>${usuario.email}</td>
            <td>${new Date(usuario.dataCadastro).toLocaleDateString()}</td>
            <td><a href='#'>Visualizar</a></td>
        `;
        container?.appendChild(row);
    });
}

//Função para gerar dados em forma de tabela - devices médios e grandes
async function displayTableAnimal(animalList) {

    const tabela = document.getElementById('dataTable');
    if (tabela)
        tabela.style.display = 'block';

    const cards = document.getElementById('card-list-animais');
    if (cards)
        cards.style.display = 'none';

    const container = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];

    container.innerHTML = '';

    if(animalList == null) {
        animalList = await retrieveAnimalData();
    }
    
    const row = document.createElement('tr');
    row.innerHTML = '';

    animalList.forEach(animal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${animal.idAnimal}</td>
            <td>${animal.numId}</td>
            <td>${animal.numIdMae}</td>
            <td>${animal.tipo}</td>
            <td>${animal.genero}</td>
            <td>${new Date(animal.dtNasc).toLocaleDateString()}</td>
            <td>${new Date(animal.dtCad).toLocaleDateString()}</td>
            <td>${animal.peso} kg</td>
            <td>${animal.status}</td>
            <td><a href='#'>Visualizar</a></td>
        `;
        container?.appendChild(row);
    });
}

/**
 *******************************   EVENTOS DE INTERAÇÃO USUÁRIO   *******************************
*/

// [ACTION] Evento para realizar login 

function loginPage() {
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
        savePrefsUsuario(data.idUsuario, data.login, data.perfil);
        window.open("home.html", "_self");
    })
    .catch(error => console.log(error));
}

// [ACTION] Evento para salvar usuário
const btnSaveUsuario = document.getElementById("btn-save-usuario");

btnSaveUsuario?.addEventListener('click', function () {

    const nome = document.getElementById('nome-completo').value;
    const cpf = document.getElementById('cpf').value;
    const dtNasc = document.getElementById('dt-nasc').value;
    const perfil = document.getElementById('options-perfil').value;
    const email = document.getElementById('email').value;
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    // Regular expression to check date format dd/mm/yyyy
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    if (!datePattern.test(dtNasc)) {
        alert("Data de nascimento não está no formato correto (dd/mm/yyyy). Por favor, corrija e tente novamente.");
        if (!nome) document.getElementById('nome-completo').value = '';
        if (!cpf) document.getElementById('cpf').value = '';
        if (!dtNasc) document.getElementById('dt-nasc').value = '';
        if (!perfil) document.getElementById('options-perfil').value = '';
        if (!email) document.getElementById('email').value = '';
        if (!login) document.getElementById('login').value = '';
        if (!senha) document.getElementById('senha').value = '';
        return;
    }

    if (nome && cpf && dtNasc && perfil && email && login && senha) {
        callApiToSaveUser(nome, cpf, dtNasc, perfil, email, login, senha);
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
        if (!nome) document.getElementById('nome-completo').value = '';
        if (!cpf) document.getElementById('cpf').value = '';
        if (!dtNasc) document.getElementById('dt-nasc').value = '';
        if (!perfil) document.getElementById('options-perfil').value = '';
        if (!email) document.getElementById('email').value = '';
        if (!login) document.getElementById('login').value = '';
        if (!senha) document.getElementById('senha').value = '';
        return;
    }

});


// Função que chama back-end para salvar usuário
async function callApiToSaveUser(nome, cpf,  dtNasc, perfil, email, login, senha) {

    const url = new URL('http://localhost:8080/gado/usuario/salvar-usuario');

    // Add login and senha as query parameters
    url.searchParams.append('login', login);
    url.searchParams.append('senha', senha);

    // Parâmetros que serão enviados no corpo da solicitação POST
    const parametros = {
        nome: nome,
        cpf: cpf,
        dataNasc: new Date(dtNasc.split('/').reverse().join('-')).toISOString().split('T')[0],
        dataCadast: new Date().toISOString().split('T')[0],
        perfil: perfil,
        emailUsuario: email,
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
            console.log('Sucesso:', data);
            alert('Usuário salvo com sucesso!');
            location.reload();
            return;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar o usuário.');
            location.reload();
            return;
        });
}


// [ACTION] Evento para filtrar usuarios
const btnFiltroUsuario = document.getElementById("btn-filtro-usuario");

btnFiltroUsuario?.addEventListener('click', function () {
    const filterText = document.getElementById("text-filtro-usuario").value;
    const option = document.getElementById("selectOptionsFiltroUsuario").value;

    fetch('http://localhost:8080/gado/usuario/buscar-usuarios?' + new URLSearchParams({
        [option]: filterText
    }), { method: 'GET' })
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            alert('Erro ao buscar usuarios!');
        }
    })
    .then(data => {
        console.log(data);
        const usuariosList = [];
        data.forEach(usuario => {
            const usuarioObj = new Usuario(usuario.login, usuario.nome, usuario.perfil, usuario.cpf, usuario.emailUsuario, usuario.dataCadast);
            usuariosList.push(usuarioObj);
        });
        displayTableUsuario(usuariosList);
    })
    .catch(error => console.log(error));
});

// [ACTION] Evento para salvar usuário
const btnSaveAnimal = document.getElementById("btn-save-animal");

btnSaveAnimal?.addEventListener('click', function () {

    const idMae = document.getElementById('n-mae').value;
    const idUsuario = getIdUsuario();
    const numId = document.getElementById('n-identificador').value;
    const tipo = document.getElementById('options-especie').value;
    const dtNasc = document.getElementById('dt-nascimento').value;
    const peso = document.getElementById('peso').value;
    const status = document.getElementById('options-status').value;
    const preco = document.getElementById('text-price-field').value;
    const genero = document.getElementById('options-genero').value;

    // Regular expression to check date format dd/mm/yyyy
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    if (!datePattern.test(dtNasc)) {
        alert("Data de nascimento não está no formato correto (dd/mm/yyyy). Por favor, corrija e tente novamente.");
        if (!idMae) document.getElementById('n-mae').value = '';
        if (!numId) document.getElementById('n-identificador').value = '';
        if (!tipo) document.getElementById('options-especie').value = '';
        if (!dtNasc) document.getElementById('dt-nascimento').value = '';
        if (!peso) document.getElementById('peso').value = '';
        if (!status) document.getElementById('options-status').value = '';
        if (!preco) document.getElementById('text-price-field').value = null;
        if (!genero) document.getElementById('options-genero').value = '';
        return;
    }

    if (idMae && numId && tipo && dtNasc && peso && status && preco && genero) {
        callApiToSaveAnimal(idMae, idUsuario, numId, tipo, genero, dtNasc, peso, status, preco);
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
        if (!idMae) document.getElementById('n-mae').value = '';
        if (!numId) document.getElementById('n-identificador').value = '';
        if (!tipo) document.getElementById('options-especie').value = '';
        if (!dtNasc) document.getElementById('dt-nascimento').value = '';
        if (!peso) document.getElementById('peso').value = '';
        if (!status) document.getElementById('options-status').value = '';
        if (!preco) document.getElementById('text-price-field').value = null;
        if (!genero) document.getElementById('options-genero').value = '';
        return;
    }

});

// Função que chama back-end para salvar usuário
async function callApiToSaveAnimal(idMae, idUsuario, numId, tipo, genero, dtNasc, peso, status, preco) {

    const url = new URL('http://localhost:8080/gado/animal/salvar-animal');


    // Parâmetros que serão enviados no corpo da solicitação POST
    const parametros = {
        idMae: idMae,
        idUsuarioCadastro: idUsuario,
        numId: numId,
        tipo: tipo,
        genero: genero,
        dataNasc: new Date(dtNasc.split('/').reverse().join('-')).toISOString().split('T')[0],
        dataCadastro: new Date().toISOString().split('T')[0],
        peso: peso,
        statusAtual: status,
        preco: preco
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
            console.log('Sucesso:', data);
            alert('Animal salvo com sucesso!');
            location.reload();
            return;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar o animal.');
            location.reload();
            return;
        });
}

// [ACTION] Evento para filtrar animais
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
            const numIdMae = animal.mae ? animal.mae.numId : "";
            const animalObj = new Animal(animal.idAnimal, animal.numId, numIdMae, animal.tipo, animal.genero, animal.dataNasc, animal.dataCadastro, animal.peso, animal.statusAtual);
            animalList.push(animalObj);
        });
        displayTableAnimal(animalList);
    })
    .catch(error => console.log(error));
});


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

//! LOCAL STORAGE - AMAZENAMENTO DO USUARIO LOCALMENTE (BROWSER)
function savePrefsUsuario(idUsuario, usuario, tipo) {
    localStorage.setItem("idUsuario", idUsuario);
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("perfil", tipo);
    window.location.href = "home.html";
}

function getIdUsuario() {
    var idUsuario = localStorage.getItem("idUsuario");
    return idUsuario;
}

function getUsuario() {
    var usuario = localStorage.getItem("usuario");
    return usuario;
}

function getPerfil() {
    var perfil = localStorage.getItem("perfil");
    return perfil;
}

function clearPrefsUsuario() {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("usuario");
    localStorage.removeItem("perfil");
}
