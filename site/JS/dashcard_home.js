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

function getTotaisHora(){
var xmlHttp = new XMLHttpRequest();
var theUrl = 'http://localhost:8080/transacao/totaisHora' 
xmlHttp.open( "GET", theUrl, false ); 
xmlHttp.send( null );
if(xmlHttp.status!=200){
  window.location.replace("index.html");
}
var dadosJson = JSON.parse(xmlHttp.responseText.replaceAll(/'/g,'"'));
return dadosJson;
}


function getTotaisVol()
{
    var xmlHttp = new XMLHttpRequest();
    var theUrl = 'http://localhost:8080/transacao/totais' 
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    if(xmlHttp.status!=200){
      window.location.replace("index.html");
    }
    var dadosJson = JSON.parse(xmlHttp.responseText.replaceAll(/'/g,'"'));
    return dadosJson;
}

function getComparativo()
{
    var xmlHttp = new XMLHttpRequest();
    var theUrl = 'http://localhost:8080/transacao/totaisComparativo' 
    xmlHttp.open( "GET", theUrl, false ); 
    xmlHttp.send( null );
    if(xmlHttp.status!=200){
      window.location.replace("index.html");
    }
    var dadosJson = JSON.parse(xmlHttp.responseText.replaceAll(/'/g,'"'));
    return dadosJson;
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

function atualizaComparativo(dadosComp){
  document.getElementById("v0").textContent = dadosComp[0]['quantidade'];
  document.getElementById("v1").textContent = dadosComp[1]['quantidade'];
  document.getElementById("v2").textContent = dadosComp[2]['quantidade'];
  document.getElementById("v3").textContent = dadosComp[3]['quantidade'];
  document.getElementById("v4").textContent = dadosComp[4]['quantidade'];
  document.getElementById("v5").textContent = dadosComp[5]['quantidade'];
  document.getElementById("v6").textContent = dadosComp[6]['quantidade'];
  document.getElementById("v7").textContent = dadosComp[7]['quantidade'];
  document.getElementById("v8").textContent = dadosComp[8]['quantidade'];
  document.getElementById("v9").textContent = dadosComp[9]['quantidade'];
  document.getElementById("v10").textContent = dadosComp[10]['quantidade'];
  document.getElementById("v11").textContent = dadosComp[11]['quantidade'];
  document.getElementById("v12").textContent = dadosComp[12]['quantidade'];
  document.getElementById("v13").textContent = dadosComp[13]['quantidade'];
  document.getElementById("v14").textContent = dadosComp[14]['quantidade'];
  document.getElementById("v15").textContent = dadosComp[15]['quantidade'];

}

var user = getUser();
var nomeUser = user['nome'] + "(" + user['racf']+ ")";
var fotoUser = user['linkFoto'];
atualizaNomeFoto(nomeUser,fotoUser);

var dados = getAgentes();
geraComboBox(dados);
generateTableHead(dados);
generateTable(dados);



var DadosHora = getTotaisHora()

var hora=[]
var sucesso=[]
var falha=[]
var fraude=[]

for (let elemento of DadosHora){
  hora.push(elemento['hora'])
  sucesso.push(elemento['sucesso'])
  falha.push(elemento['falha'])
  fraude.push(elemento['fraude'])
}



var dadosT= getTotaisVol();
var sus1 = dadosT[0]['quantidade']
var fal1 = dadosT[1]['quantidade']
var fra1 = dadosT[2]['quantidade']




var color = Chart.helpers.color;
              var barChartData = {

                labels: ['00h', '01h', '02h', '03h', '04h', '05h', '07h', '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
                datasets: [{
                  label: 'Sucesso',
                  backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.green,
                  borderWidth: 1,
                  data: sucesso
                }, {
                  label: 'Falha',
                  backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.orange,
                  borderWidth: 1,
                  data: falha
                },
                {
                  label: 'Fraude',
                  backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                  borderColor: window.chartColors.red,
                  borderWidth: 1,
                  data: fraude
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
                      fra1 , fal1 , sus1
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
          
            //  window.onload = function() {
          //      var ctx = document.getElementById('chart-area').getContext('2d');
          //      window.myPie = new Chart(ctx, config);
          //    };
          
          var dadosComp = getComparativo();
          atualizaComparativo(dadosComp)

          
              