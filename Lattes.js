$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(99) 99999-9999');
  });

let dataBase = [];
let dataCerti = []; 

function User (name, cpf, email, cellphone, dataNasc, pswd, lattes, interrest, university ){ //função construtora para o cadastro.
    this.nome = name;
    this.cpf = cpf;
    this.email = email;
    this.dataNasc = dataNasc;
    this.interesse = interrest;
    this.pswd = pswd;
    this.university = university;
    this.site = lattes;
    this.celular = cellphone;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9]));
    localStorage.setItem("user", JSON.stringify(dataBase));
    alert("Cadastro Realizado com Sucesso!");

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
                localStorage.setItem('online', JSON.stringify(dataBase[i]));
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
    localStorage.remove("online");
    location.href="index.html"; //ou window.open("home.html") para abrir em uma nova aba
}

function AddHour(event, beginEvent,  endEvent, hour,type ){
    this.evento = event;
    this.beginEvent = beginEvent;
    this.endEvent = endEvent;
    this.horas = hour;
    this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
}

function Add(){
    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});  
    dataCerti.push(new AddHour (certificado[0], certificado[1], certificado[2], certificado[3], certificado[4]))
    localStorage.setItem("certificate", JSON.stringify(dataCerti))
    alert("Certificado Adicionado com Sucesso!")
    // document.getElementById('evento').innerHTML = add; //aqui tem que colocar uma construção de tabela para adicionar as informações de forma a visualizar 
}
