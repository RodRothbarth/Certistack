// comimit pull e push

$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(00) 00000-0000');
    $(".dataNasc").mask("00/00/0000");
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];
let dataCerti = []; 

function User (name, email, pswd, account, documents, cellphone, dataNasc, university, area, lattes, certificates){ //função construtora para o cadastro.
    this.conta = account;
    this.area = area;
    this.celular = cellphone;
    this.certificados = certificates;
    this.dataNasc = dataNasc;
    this.documento = documents;
    this.email = email;
    this.site = lattes;
    this.nome = name;
    this.pswd = pswd;
    this.university = university;
};

function Cadastrar(){ //sistema para cadastrar um novo usuario.
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    
    if (localStorage.getItem("user") === null ){
        dataBase.push(new User(user[0], user[1], user[2],user[4], user[5], user[6], user[7], user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        dataBase = JSON.parse(localStorage.getItem("user"))
        dataBase.push(new User(user[0], user[1], user[2],user[4], user[5], user[6], user[7], user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
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

function Chamar(){
    var strCPF = document.getElementById("cpf").value;
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) == true) {

    innerHTML = "Você digitou um CPF Válido!"
    }else{
    innerHTML = "Você digitou um CPF Inválido!"
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

function Validation(){
dataBase = JSON.parse(localStorage.getItem("user"))
let usern = document.getElementById("cpf").value;
let pssw = document.getElementById("senha");
    for (let i = 0; i < dataBase.length; i++){
        alert(dataBase[i].documento)
        alert(usern)
        if(dataBase[i].documento === usern.value){
            alert(qwe)
            if(dataBase[i].pswd == pssw.value){
                alert("Sucesso");
                localStorage.setItem('online', JSON.stringify(dataBase[i]));
                // location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
            }else{
                alert("Senha Incorreta");
            }
            break;
        } 
    }
}

function mostraCadastro(){
    $(".cadastro").show();
    $(".login").hide();
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

function Add(){

    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
        let day1 = new Date(document.getElementById("day1").value.split('-').join('/')) 
        let dataFormatada = ("0" + day1.getDate()).substr(-2) + "/" 
        + ("0" + (day1.getMonth() + 1)).substr(-2) + "/" + day1.getFullYear();
        let day2 = new Date(document.getElementById("day2").value.split('-').join('/'))
        let dayFormat = ("0" + day2.getDate()).substr(-2) + "/" 
        + ("0" + (day2.getMonth() + 1)).substr(-2) + "/" + day2.getFullYear(); //uso para formatar a data em pt-br

    if (certificado[0] && certificado[1] && dayFormat && dataFormatada){
    
        if (localStorage.getItem("certificate") === null ){
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]))
                localStorage.setItem("certificate", JSON.stringify(dataCerti))
                alert("Certificado adicionado com Sucesso!")
        } else { 
            
            dataCerti = JSON.parse(localStorage.getItem("certificate"))  // for? //[teste 1]
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]))
            localStorage.setItem("certificate", JSON.stringify(dataCerti))
            alert("Certificado adicionado com Sucesso!")
        }
    }else{  
            alert("Todos os campos devem ser preenchidos.")
        }  
            
}

// function RemoveCert(){
//     localStorage.removeItem("certificate")
//     let confirm = prompt("Digite o nome do evento para confirmar:")
    
//     for (let i=0; i > dataCerti.length; i++){
//         if(dataCerti[i].evento === confirm){
//             localStorage.removeItem("certificate")
//         }
//     }
// }
// let linhaFoot = criaTag("tr");
// let celulaFoot = criaCelula("td","Certistack");
// celulaFoot.setAttribute("colspan",5);
// linhaFoot.appendChild(celulaFoot);
// tfoot.appendChild(linhaFoot);
    
// tabela.appendChild(thead);
// tabela.appendChild(tbody);
// tabela.appendChild(tfoot);
