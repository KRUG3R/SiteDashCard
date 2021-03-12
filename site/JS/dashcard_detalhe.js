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

  function getGrafico1(parceiroID)
  {
      var xmlHttp = new XMLHttpRequest();
      var theUrl = 'http://localhost:8080/transacao/totaisHora/'+parceiroID
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

var dadosGraf1 = getGrafico1(parceiro['id']);
var horaGraf1=[];
var sucessoGraf1=[];
var falhaGraf1=[];
var fraudeGraf1=[];

for (let elemento of dadosGraf1){
  alert[elemento['hora']]
  horaGraf1.push(elemento['hora']);
  sucessoGraf1.push(elemento['sucesso']);
  falhaGraf1.push(elemento['falha']);
  fraudeGraf1.push(elemento['fraude']);
}



var color = Chart.helpers.color;
              var barChartData = {

                labels: ['00h', '01h', '02h', '03h', '04h', '05h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
                datasets: [{
                  label: 'Sucesso',
                  backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.green,
                  borderWidth: 1,
                  data: sucessoGraf1
                }, {
                  label: 'Falha',
                  backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.orange,
                  borderWidth: 1,
                  data: falhaGraf1
                },
                {
                  label: 'Fraude',
                  backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.red,
                  borderWidth: 1,
                  data: fraudeGraf1
                }
              
              
              ]
          
              };
          


              window.onload = function() {
                var ctx = document.getElementById('canvas').getContext('2d');
                window.myBar = new Chart(ctx, {
                  type: 'bar',
                  data: barChartData,
                  options: {
                    responsive: true,
                    legend: {
                      position: 'top',
                    
                    },
                    title: {
                      display: false,
                      text: 'Transações'
                    }
                  }
                });
          
                var ctx2 = document.getElementById('chart-area').getContext('2d');
                window.myPie = new Chart(ctx2, config);


              };






 
          
              var config = {
                type: 'pie',
                data: {
                  datasets: [{
                    data: [
                      fraude , falha , sucesso
                    ],
                    backgroundColor: [
                      color(window.chartColors.red).alpha(0.5).rgbString(),
                      color(window.chartColors.orange).alpha(0.5).rgbString(),
                        color(window.chartColors.green).alpha(0.5).rgbString(),
                    ],
                    borderColor:[window.chartColors.red, window.chartColors.orange, window.chartColors.green],  
                    label: 'total por Tipo'
                  }],
                  labels: [
                    'Fraude',
                    'Falha',
                    'Sucesso'
                  ]
                },
                options: {
                  responsive: true
                }
              };
          