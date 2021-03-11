function getSession(){
    var strUser = localStorage.getItem("userDASH");
    if (!strUser){    // se o objeto não existe no localStorage, signifca que eu não estou conectado
      window.location = "index.html";
      return;
    }
    var user = JSON.parse(strUser)
    return user.sessao
  }
  function getUsuario(session)
  {
      var xmlHttp = new XMLHttpRequest();
      var theUrl = 'https://5loarm486l.execute-api.us-east-1.amazonaws.com/dev/usuario?sessionID=' + session
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
  var sessionCode = getSession();
    var dadosUser = getUsuario(sessionCode);
    var nomeUser = dadosUser['nome'] + "(" + dadosUser['racf']+ ")";
    var fotoUser = dadosUser['urlFoto'];    
    atualizaNomeFoto(nomeUser,fotoUser);