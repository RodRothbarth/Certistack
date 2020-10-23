$(document).ready(function(){
    //$(".cpf").mask('000.000.000-00');
    $(".numCelular").mask('(00) 00000-0000');
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];

function mostraCadastro(){ //muda a mostragem da pagina de login para cadastro
    $(".cadastro").show();
    $(".login").hide();
};

//função criadora de objeto para adição de informação em cadastro
function User(name, email, senha, documento, telefone, dataNasc, instituicao, area, lattes, certificados){
    this.nome = name;
    this.email = email;
    this.senha = senha;
    this.documento = documento;
    this.telefone = telefone;
    this.dataNasc = dataNasc;
    this.instituicao = instituicao;
    this.area = area;
    this.lattes = lattes;
    this.certificados = certificados;
}

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    let nasc = new Date(user[7].split('-').join('/')).toLocaleDateString('pt-br')    
        
    if (localStorage.getItem("user") === null ){
        dataBase.push(new User(user[0], user[1], user[2], user[4], user[5], user[6], nasc , user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }else{
        dataBase = JSON.parse(localStorage.getItem("user"))
        dataBase.push(new User(user[0], user[1], user[2], user[4], user[5], user[6], nasc , user[8], user[9]));
        localStorage.setItem("user", JSON.stringify(dataBase));
        alert("Cadastro Realizado com Sucesso!");
        $(".login").show();
        $(".cadastro").hide();
    }        
}
//valida o login para entrada no perfil do usuario ou cliente desejado
function Validation(){
    dataBase = JSON.parse(localStorage.getItem('user'))
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");

    for(let i = 0; i < dataBase.length; i++){
        if(dataBase[i].documento === usern.value){
            if(dataBase[i].senha === pssw.value){
                localStorage.setItem("online", JSON.stringify(dataBase[i]))
            }else{
                alert("Senha Incorreta!");
            };
            break;
        }else{
            alert("Login Incorreto!")
        };
    };

};



function ValidPass(){
    let test = document.getElementById("senhac").value;
    let test2 = document.getElementById("passc").value;
    if(test !== test2){
        alert("Os campos de senha devem ser iguais!")
    }
}

//realizateste para verificar a autenticidade do numero de cpf
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
    
function Chamar(){ //realiza o teste no cpf inserido
    var strCPF = document.getElementById("documento").value;
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) !== true) {
        alert("Você digitou um CPF Inválido!")
    } 
}