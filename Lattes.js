$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(99) 99999-9999');
  });

let dataBase = [];

function User (name, cpf, email, dataNasc, interrest, pswd, university, lattes){ //função construtora para o cadastro.
    this.nome = name;
    this.cpf = cpf;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    // ADICIONAR TELEFONE CELULAR
    let name = document.getElementById('name');
    let cpf = document.getElementById('cpf');
    let email = document.getElementById('email');
    let dataNasc = document.getElementById('dataNasc');
    let interrest = document.getElementById('interrest');
    let pswd = document.getElementById('pswd');
    let college = document.getElementById('college');
    let lattes = document.getElementById('lattes');
    let user = new User(name.value, cpf.value, email.value, dataNasc.value, interrest.value, pswd.value, college.value, lattes.value);
    dataBase.push(user);
}

function validation(){
//validação de login e senha para entrar na area de perfil.
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");
    for (i = 0; i <= dataBase.length; i++){
        if(i == dataBase.length){
            alert("Login Incorreto");
        }else if (dataBase[i].cpf == usern.value || dataBase[i].email == usern.value){
            if(dataBase[i].pswd == pssw.value){
                console.log("Sucesso");
                localStorage.setItem('user', JSON.stringify(dataBase[i]));
                location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
            }else{
                alert("Senha Incorreta");
            }
            break;
        } 
    }
    usern.value = "";
    pssw.value = "";
}

function Exit(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.remove("user");
    location.href="home.html"; //ou window.open("home.html") para abrir em uma nova aba
}

function AddHour(event, hour, type, date){
    this.evento = event;
    this.data = date;
    this.horas = hour;
    this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
}

function Add(){
    let evento = document.getElementById('titulo');
    let data = document.getElementById('data');
    let horas = document.getElementById('horas');
    let tipo = document.getElementById("tipo")

    let add = new Addhour (evento.value, horas.value, tipo.value, data.value)
    document.getElementById('evento').innerHTML = add; //aqui tem que colocar uma construção de tabela para adicionar as informações de forma a visualizar 
}

function criaTag(elemento) {
    return document.createElement(elemento)
    }
    
    let titulo = document.querySelector("section h1");
    titulo.textContent = "A DOS ALUNOS";
    
    let tabela = document.getElementById("tabela");
    
    let thead = criaTag("thead");
    let tbody = criaTag("tbody");
    let tfoot = criaTag("tfoot");
    
    let indicesTabela = ["Nome do Aluno", "Nota 1", "Nota 2", "Nota 3", "Nota 4", "Media", "Status"];
    let linhaHead = criaTag("tr");
    
    function criaCelula(tag, text) {
        tag = criaTag(tag);
        tag.textContent = text;
        return tag;
    }
    
    for(j = 0; j < indicesTabela.length; j++) {
        let th = criaCelula("th", indicesTabela [j]);
        linhaHead.appendChild(th);
    }
    thead.appendChild(linhaHead);
    
    
    for(j = 0; j < linhasTabela.length; j++) {
        let linhaBody = criaTag("tr");
    
        for(i = 0; i < linhasTabela[j].length; i++) {
            cel = criaCelula("td", linhasTabela[j][i]);
            linhaBody.appendChild(cel); 
        }
        tbody.appendChild(linhaBody);
    }
    let linhaFoot = criaTag("tr");
    let celulaFoot = criaCelula("td","Colégio Floripa");
    celulaFoot.setAttribute("colspan",7);
    linhaFoot.appendChild(celulaFoot);
    tfoot.appendChild(linhaFoot);
    
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    tabela.appendChild(tfoot);