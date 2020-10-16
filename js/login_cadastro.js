$(document).ready(function(){
    $('.CPF').mask('000.000.000-00');
    $('.numCelular').mask('(00) 00000-0000');
    $(".dataNasc").mask("00/00/0000");
    $(".dataCertInicio").mask("00/00/0000");
    $(".dataCertFim").mask("00/00/0000");
  });

let dataBase = [];

//função criadora de objeto para adição de informação em cadastro
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
    this.senha = pswd;
    this.university = university;
};

function mostraCadastro(){ //muda a mostragem da pagina de login para cadastro
    $(".cadastro").show();
    $(".login").hide();
};

//valida o login para entrada no perfil do usuario ou cliente desejado
function Validation(){
    dataBase = JSON.parse(localStorage.getItem('user'))
    let usern = document.getElementById("cpf");
    let pssw = document.getElementById("senha");

    for(let i = 0; i < dataBase.length; i++){
        alert(dataBase[i].documento);
        alert(usern);
        if(dataBase[i].documento === usern.value){
            alert("QWE");
            if(dataBase[i].senha === pssw.value){
                alert("sucesso");
                localStorage.setItem("online", JSON.stringify(dataBase[i]))
                // location.href="perfil.html"; // site à ser feita de perfil do usuario validado, ou window.open("home.html") para abrir em uma nova aba
            }else{
                alert("senha incorreta!");
            };
            break;
        }else{
            alert("CPF incorreto!");
        };
    };

}

function Cadastrar(){ //sistema para cadastrar um novo usuario.
    let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
    
    if (ValidPass() || user){
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
    }else{
        alert("Todos os campos devem ser preencidos corretamente!")
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
    var strCPF = document.getElementById("cpf").value;
    TestaCPF(strCPF);
    if (TestaCPF(strCPF) == true) {
    innerHTML = "Você digitou um CPF Válido!"
    }else{
    innerHTML = "Você digitou um CPF Inválido!"
    } 
}

function ValidPass(){ //valida se a senha e a a comfirmação de senha estao iguais.
    if (user[2] === user[3]){
        document.getElementById("msgSenha").innerHTML = "Senha OK!"
            return true
    }else{
        document.getElementById("msgSenha").innerHTML = "Senha Diferente!"
            return false
        }
}