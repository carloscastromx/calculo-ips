var claseVal = document.getElementById('clase-ip');
var mascVal = document.getElementById('mascara-ip');
var divDatos = document.getElementById('datos-ip');

let claseIP = 0;

function calcularDir(clase, ip){
  var ip1 = document.getElementById('ip-01').value;
  var ip2 = document.getElementById('ip-02').value;
  var ip3 = document.getElementById('ip-03').value;
  //Clase de IP: A => 1, B => 2, C => 3
  var valores = [8388608,4194304,2097152,1048576,524288,262144,131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1];
  var posiciones = [];
  var bits = [128,64,32,16,8,4,2,1,128,64,32,16,8,4,2,1,128,64,32,16,8,4,2,1];
  var x = ip;

  for(var i = 0; i < 24; i++){
    if(x >= valores[i]){
      posiciones.push(i);
      x = x - valores[i];
    }
  }
  if(clase == 1){
    //Llenado de octetos para clase A
    var octeto2 = 0;
    var octeto3 = 0;
    var octeto4 = 0;
    for(var i = 0; i < posiciones.length; i++){
      if(posiciones[i] >= 0 && posiciones[i] <= 7){
        octeto2 += bits[posiciones[i]];
      } else if(posiciones[i] >= 8 && posiciones[i] <= 15){
        octeto3 += bits[posiciones[i]];
      } else{
        octeto4 +=bits[posiciones[i]];
      }
    }
    document.getElementById('calc-msg').innerHTML = '<p class="result-msg">La dirección IP #'+ip+' de la red '+ip1+'.0.0.0 es: '+ip1+'.'+octeto2+'.'+octeto3+'.'+octeto4+'</p>';
  } else if(clase == 2){
    //Llenado de octetos para clase B
    var octeto3 = 0;
    var octeto4 = 0;
    for(var i = 0; i < posiciones.length; i++){
      if(posiciones[i] >= 8 && posiciones[i] <= 15){
        octeto3 += bits[posiciones[i]];
      } else{
        octeto4 +=bits[posiciones[i]];
      }
    }
    document.getElementById('calc-msg').innerHTML = '<p class="result-msg">La dirección IP #'+ip+' de la red '+ip1+'.'+ip2+'.0.0 es: '+ip1+'.'+ip2+'.'+octeto3+'.'+octeto4+'</p>';
  } else{
    //Llenado de octetos para Clase C
    var octeto4 = 0;
    for(var i = 0; i < posiciones.length; i++){
        octeto4 +=bits[posiciones[i]];
    }
    document.getElementById('calc-msg').innerHTML = '<p class="result-msg">La dirección IP #'+ip+' de la red '+ip1+'.'+ip2+'.'+ip3+'.0 es: '+ip1+'.'+ip2+'.'+ip3+'.'+octeto4+'</p>';
  }
}

function validarDatos(){
    var octeto1 = document.getElementById('ip-01').value;
    var octeto2 = document.getElementById('ip-01').value;
    var octeto3 = document.getElementById('ip-01').value;
    var ip = document.getElementById('ip-calc').value;

    if(ip == 1){
      document.getElementById('calc-msg').innerHTML = '<p class="error-msg">No necesitas la herramienta para calcular la primera dirección IP ¿o si?</p>';
    } else if(ip == ""){
      document.getElementById('calc-msg').innerHTML = '<p class="error-msg">Ingresa que número de IP quieres calcular</p>';
    } else{
      if(claseIP == 1){
        if(octeto1 == ""){
          document.getElementById('calc-msg').innerHTML = '<p class="error-msg">Debes ingresar los valores de los octetos de red para Clase A</p>';
        } else {
          calcularDir(claseIP,ip);
        }
      } else if(claseIP == 2){
        if(octeto1 == "" || octeto2 == ""){
          document.getElementById('calc-msg').innerHTML = '<p class="error-msg">Debes ingresar los valores de los octetos de red para Clase B</p>';
        } else {
          calcularDir(claseIP,ip);
        }
      } else if(claseIP == 3){
        if(octeto1 == "" || octeto2 == "" || octeto3 == ""){
          document.getElementById('calc-msg').innerHTML = '<p class="error-msg">Debes ingresar los valores de los octetos de red para Clase C</p>';
        } else{
          calcularDir(claseIP, ip);
        }
      } else{
          document.getElementById('calc-msg').innerHTML = '<p class="error-msg">Error</p>';
      }
    }
}

function calcularClase(octeto){
  if(octeto >=1 && octeto <= 126){
      claseVal.value = "Clase A";
      mascVal.value = "255.0.0.0";
      claseIP = 1;
      document.getElementById('ip-02').setAttribute("disabled","");
      document.getElementById('ip-02').value = 0;
      document.getElementById('ip-03').setAttribute("disabled","");
      document.getElementById('ip-03').value = 0;
      divDatos.style.display = "block";
  } else if (octeto >= 127 && octeto <= 191) {
      claseVal.value = "Clase B";
      mascVal.value = "255.255.0.0";
      document.getElementById('ip-02').removeAttribute("disabled","");
      document.getElementById('ip-02').value = "";
      document.getElementById('ip-03').setAttribute("disabled","");
      document.getElementById('ip-03').value = 0;
      divDatos.style.display = "block";
      claseIP = 2;
  } else if (octeto >= 192 && octeto <= 223) {
      claseVal.value = "Clase C";
      mascVal.value = "255.255.255.0";
      document.getElementById('ip-02').removeAttribute("disabled","");
      document.getElementById('ip-02').value = "";
      document.getElementById('ip-03').removeAttribute("disabled","");
      document.getElementById('ip-03').value = "";
      divDatos.style.display = "block";
      claseIP = 3;
  } else{
      claseIP = 0;
      document.getElementById('calc-msg').innerHTML = '<p class="error-msg">IP no existente, el primer octeto debe ser mayor o igual a 1 y menor o igual a 223</p>'
  }
}

document.getElementById('ip-01').addEventListener('change', function(){
  calcularClase(this.value);
});

document.getElementById('calc-btn').addEventListener('click', function(){
    validarDatos();
});
