$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(99) 99999-9999');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];
let dataCerti = []; 
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
let usern = document.getElementById("cpf");
let pssw = document.getElementById("senha");

function User (name, documents, email, cellphone, dataNasc, pswd, lattes, interrest, university, account, certificates ){ //função construtora para o cadastro.
    this.nome = name;
    this.documento = documents;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
    this.celular = cellphone;
    this.conta = account;
    this.certificados = certificates;
};

function mostraCadastro(){
    $(".cadastro").show();
    $(".login").hide();
}

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    if (!ValidPass() || !user){ // confirma se os campos foram preenchidos com a mesma senha  VERIFICAR COMO ATESTAR TREU OU FALSE NO RETURN
        alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS CORRETAMENTE!")
    }else{
        if (localStorage.getItem("user") === null ){
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9], user[10]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }else{
            dataBase = JSON.parse(localStorage.getItem("user"))
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9], user[10]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }
    } 
}

function DelUser(){ //deletar usuario do sistema
    let toDel = JSON.parse(localStorage.getItem("online"))
    for (let i=0; i < dataBase.length; i++){
        if (dataBase[i].cpf === toDel.cpf){
          alert("deletaria o que pediu")
            // dataBase.splice(dataBase[i],1);
           // location.href="index.html";
        }
    }
}

function ValidPass(){
    if (user[5] === user[6]){
        document.getElementById("msgSenha").innerHTML = "Senha OK!"
            return true
    }else{
        document.getElementById("msgSenha").innerHTML = "Senha Diferente!"
            return false
        }
}

function Validation(){ //validação de login e senha para entrar na area de perfil.
    
    for (i = 0; i <= dataBase.length; i++){
        if(i == dataBase.length){
            alert("Login Incorreto");
        }else if (dataBase[i].cpf == usern.value || dataBase[i].email == usern.value){
            if(dataBase[i].pswd == pssw.value){
                console.log("Sucesso");
                localStorage.setItem('online', JSON.stringify(dataBase[i]));
                location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
            }else{
                alert("Senha Incorreta");
            }
            break;
        } 
    }
}

function TestaCPF(strCPF) {
    var Soma = 0;
    var Resto;
    
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;    
}
// ambas as funçoes para testar a validação dos cpfs inceridos.
function Chamar(){
    var strCPF = document.getElementById("cpf").value;
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) == true) {
        alert("Você digitou um CPF Válido!")
    }else{
        alert("Você digitou um CPF Inválido!")
    } 
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    dataBase = JSON.parse(localStorage.getItem("user"))
    for(let i =0; i < dataBase.length; i++){
        if (dataBase[i].documento === JSON.parse(localStorage.getItem("online")).documento){
            dataBase[i] = JSON.parse(localStorage.getItem("online"))
        }
    }
    localStorage.removeItem("online");
    location.href="index.html"; //ou window.open("home.html") para abrir em uma nova aba
}

function Add(){ //adicopnar certificados (array para os certificados)
    
    //  Array.from(document.getElementsByName("addCerti")).forEach(function(element){
    //     certificado[element.keys] = element.value;});
    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
         return element.value;}); //tentar pegar direto do formulario 
    if (certificado){

        let update = JSON.parse(localStorage.getItem("online"))
        dataCerti.push(certificado);
        update.certificados = dataCerti;    
        alert("Certificado adicionado com Sucesso!");
        //adicionar no objeto 'user.certificado"

    }else{  
        alert("Todos os campos devem ser preenchidos.");
    }              
}

function RemoveCert(){
    
   let confirm = prompt("Digite o nome do evento para confirmar:");
    for (let i=0; i < dataCerti.length; i++){
        
        if(Object.keys(dataCerti[i].evento) === confirm){
            dataCerti.splice(dataCerti[i],1);
            alert(dataCerti);
        };
    };   
}

let linhasTabela = getDataCertificate()

function getDataCertificate() {
    return JSON.parse(localStorage.getItem("certificate"));
}

function criaTag(elemento) {
    return document.createElement(elemento)
}
        
let titulo = document.querySelector("h1"); 
let tabela = document.getElementById("tabela");    
let thead = criaTag("thead");
let tbody = criaTag("tbody");
let tfoot = criaTag("tfoot");    
let indicesTabela = ["Evento", "Data Inicial", "Data Final", "Horas", "Tipo"];   
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
let celulaFoot = criaCelula("td","Certistack");
celulaFoot.setAttribute("colspan",5);
linhaFoot.appendChild(celulaFoot);
tfoot.appendChild(linhaFoot);
    
tabela.appendChild(thead);
tabela.appendChild(tbody);
tabela.appendChild(tfoot);