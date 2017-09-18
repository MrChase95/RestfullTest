var testUser = {
    nome : "Matheus",
    email : "matheusprf95@gmail.com",
    senha : "1234",
    telefones : [[11, 999998888], [11, 222223333]]
};

function changePage(){
    document.write(document.namespaceURI.toString());
}


function newPhoneTextField(){
    var temp = document.getElementById("textInputs");
    temp.innerHTML += '<input type="text" placeholder="telefone" class="telefone">';
}

function addUserToDB(){
    nome = document.getElementById("nome").value;
    email = document.getElementById("email").value;
    senha = document.getElementById("senha").value;
    telefones = document.getElementsByClassName("telefones");


}

function deleteUser(id){
    id = document.getElementById("userid").value;
}

function returnUserList(id){
    if (id == ""){

    }
}

function updateUserData(id){
    id = document.getElementById("userid").value;
}


