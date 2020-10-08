// $(document).ready(function(){
//     $('.CPF').mask('000.000.000-00');
//     $('.numCelular').mask('(99) 99999-9999');
//   });

let dataBase = [];
let dataCerti = []; 
let user = Array.from(document.getElementsByName("cadastro")).map(function(element){return element.value;});
let usern = document.getElementById("cpf");
let pssw = document.getElementById("senha");

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
    if (ValidEmail()==false || ValidPass()==false || !user){ // confirma se os campos foram preenchidos com a mesma senha  VERIFICAR COMO ATESTAR TREU OU FALSE NO RETURN
        alert("TODOS OS CAMPOS DEVEM SER PREENCHIDOS CORRETAMENTE!")
    }else{
        if (localStorage.getItem("user") === null ){
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }else{
            dataBase = JSON.parse(localStorage.getItem("user"))
            dataBase.push(new User(user[0], user[1], user[2], user[3], user[4], user[5], user[7], user[8], user[9]));
            localStorage.setItem("user", JSON.stringify(dataBase));
            alert("Cadastro Realizado com Sucesso!");
        }
    } 
}

function ValidEmail(field){
    let address = field.value.substring(0, field.value.indexOf("@"));
    let domain = field.value.substring(field.value.indexOf("@")+1, field.value.length);

    if ((address.length >=1)&&
        (domain.length>=3)&&
        (adress.search("@")==-1)&&
        (domain.search("@")==-1)&&
        (address.search(" ")==-1)&&
        (domain.search(" ")==-1)&&
        (domain.search(".")!=-1)&&
        (domain.indexOf(".")>=1)&&
        (domain.lastIndexOf(".")< domain.length - 1)){
            document.getElementById("msgEmail").innerHTML = "E-mail Válido"
            return true
    }else{
            document.getElementById("msgEmail").innerHTML = "E-mail Inválido"
            return false
        }
}

function ValidPass(){
    if (user[5] === user[6]){
        return true
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
    usern.value = "";
    pssw.value = "";
}

function Logout(){ // botão para sair do perfil validado para troca de perfil ou saida "segura" do sistema. 
    localStorage.removeItem("online");
    location.href="index.html"; //ou window.open("home.html") para abrir em uma nova aba
}

function AddHour(event, beginEvent, endEvent, hour, type){
    this.evento = event;
    this.beginEvent = beginEvent;
    this.endEvent = endEvent;
    this.horas = hour;
    this.tipo = type; //tem 3 tipos: Oficinas, cursos extracurriculares e eventos academicos.
}

function Add(){
    let certificado = Array.from(document.getElementsByName("addCerti")).map(function(element){
        return element.value;});
    let day1 = new Date(document.getElementById("day1").value.split('-').join('/'));
    let day2 = new Date(document.getElementById("day2").value.split('-').join('/'));
    let dataFormatada = ("0" + day1.getDate()).substr(-2) + "/" + ("0" + (day1.getMonth() + 1)).substr(-2) + "/" + day1.getFullYear();
    let dayFormat = ("0" + day2.getDate()).substr(-2) + "/" + ("0" + (day2.getMonth() + 1)).substr(-2) + "/" + day2.getFullYear(); //uso para formatar a data em pt-br
    
    if (certificado[0], certificado[1] && dayFormat && dataFormatada){
        if (localStorage.getItem("certificate") === null ){
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]));
                localStorage.setItem("certificate", JSON.stringify(dataCerti));
                alert("Certificado adicionado com Sucesso!");
        } else { 
            dataCerti = JSON.parse(localStorage.getItem("certificate"));  
            dataCerti.push(new AddHour (certificado[0], dataFormatada, dayFormat, certificado[1], certificado[2]));
            localStorage.setItem("certificate", JSON.stringify(dataCerti));
            alert("Certificado adicionado com Sucesso!");
        }
    }else{  
        alert(certificado, dayFormat, dataFormatada)
        alert("Todos os campos devem ser preenchidos.");
        }  
            
}

function RemoveCert(){
   // let confirm = prompt("Digite o nome do evento para confirmar:");
    dataCerti = JSON.parse(localStorage.getItem("certificate"));
    let test = Object.create({}, { getFoo: { value: function() { return this.evento; } } });
    console.log(test);
    // for (let i=0; i < dataCerti.length; i++){
        
    //     if(Object.keys(dataCerti[i].evento) === confirm){
    //         dataCerti.splice(dataCerti[i],1);
    //         alert(dataCerti);
    //     };
    // };
};