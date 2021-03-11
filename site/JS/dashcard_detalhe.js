function getUser(){
  var strUser = localStorage.getItem("userDASH");
  if (!strUser){    // se o objeto não existe no localStorage, signifca que eu não estou conectado
    window.location = "index.html";
    return;
  }
  var user = JSON.parse(strUser.replaceAll(/'/g,'"'));
  return user
}





  function getParceiro(){
    var parceiroID = localStorage.getItem("parceiroID");
    if (!parceiroID){    
      window.location = "dashcard.html";
      return;
    }
    
    return JSON.parse(parceiroID)
  }

  function getDetalheParceiro(parceiroID)
  {
      var xmlHttp = new XMLHttpRequest();
      var theUrl = 'http://localhost:8080/transacao/totais/'+parceiroID
      xmlHttp.open( "GET", theUrl, false ); 
      xmlHttp.send( null );
      if(xmlHttp.status!=200){
        window.location = "index.html";
        return;
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

  function logout(){
    localStorage.removeItem("userDASH");
    window.location = "index.html";
    return;
  }

function MontaDadosParceiro(nome, volume, sucesso, falha, fraude){
  document.getElementById("nomeAgt").textContent = nome;
  document.getElementById("vTrans").textContent = volume;
  document.getElementById("vSucesso").textContent = sucesso;
  document.getElementById("vFalhas").textContent = falha;
  document.getElementById("vFraudes").textContent = fraude;


}

var user = getUser();
var nomeUser = user['nome'] + "(" + user['racf']+ ")";
var fotoUser = user['linkFoto'];
atualizaNomeFoto(nomeUser,fotoUser);

var parceiro = getParceiro();
var id = parceiro['id'];
var nome = parceiro['nome'];
var volume = parceiro['volume'];

var dados = getDetalheParceiro(id);


var sucesso = 0
var falha = 0
var fraude = 0

for (let dado of dados){
  if (dado['status'] == 0){
     sucesso = dado['quantidade'];
     
    }
  else if(dado['status'] == 1){
     falha =dado['quantidade'];
  }
  else if (dado['status'] == 2){
      fraude = dado['quantidade']
    }
}


MontaDadosParceiro(nome, volume, sucesso, falha, fraude);
