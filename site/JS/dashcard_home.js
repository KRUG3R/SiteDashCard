function getUser(){
  var strUser = localStorage.getItem("userDASH");
  if (!strUser){    // se o objeto não existe no localStorage, signifca que eu não estou conectado
    window.location = "index.html";
    return;
  }
  var user = JSON.parse(strUser.replaceAll(/'/g,'"'));
  return user
}

function detalhe(){
  //alert(document.getElementById("CBparceiro").value);
  var valor=document.getElementById("CBparceiro").value
  localStorage.setItem("parceiroID", valor)
  window.location = "detalheAgente.html";
  return;

}







function getAgentes()
{
    var xmlHttp = new XMLHttpRequest();
    var theUrl = 'http://localhost:8080/agentes/' 
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    if(xmlHttp.status!=200){
      window.location.replace("index.html");
    }
    var dadosJson = JSON.parse(xmlHttp.responseText.replaceAll(/'/g,'"'));
    return dadosJson;
}

function atualizaNomeFoto(nome, foto){
  try{
  document.getElementById("nomeUser").textContent = nome; 
  document.getElementById("fotoUser").src = foto; 
  } catch{}
}

function geraComboBox(data) {
  try{
    let select = document.getElementById("CBparceiro");
    for (let element of data) {
      var option = document.createElement('option');
      option.value = JSON.stringify(element);
      option.text = element['nome'];
      select.add(option);
    }
  } catch{}
}



function generateTableHead(data) {
  let keys = Object.keys(data[0]);
  let table = document.getElementById("tabelaParceiros");
  let thead = table.createTHead();
  let row = thead.insertRow();
  //coluna  Parceiro
    var th = document.createElement("th");
    var text = document.createTextNode("Parceiro");
    th.appendChild(text);
    row.appendChild(th);
  //coluna  Volume Transacional  
    th = document.createElement("th");
    text = document.createTextNode("Volume Transacional");
    th.appendChild(text);
    row.appendChild(th);
  
}

function generateTable(data) {
  table = document.getElementById("tabelaParceiros");
  
  for (let element of data) {
        row = table.insertRow();
        cell = row.insertCell();
        text = document.createTextNode(element['nome'] );
        cell.appendChild(text);
        cell = row.insertCell();
        text = document.createTextNode(element['volume'] );
        cell.appendChild(text);
    
  }
}

function logout(){
  localStorage.removeItem("userDASH");
  window.location = "index.html";
  return;
}

var user = getUser();
var nomeUser = user['nome'] + "(" + user['racf']+ ")";
var fotoUser = user['linkFoto'];
atualizaNomeFoto(nomeUser,fotoUser);

var dados = getAgentes();
geraComboBox(dados);
generateTableHead(dados);
generateTable(dados);







