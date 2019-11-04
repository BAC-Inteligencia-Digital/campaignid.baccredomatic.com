
document.querySelector('#botonProbarChec').addEventListener('click', determinarCodigoCanales);

var check_email = document.getElementById("email");
var check_call = document.getElementById("call_center");
var check_pagweb = document.getElementById("pag_web");
var check_atm = document.getElementById("atm");
var check_bel = document.getElementById("bel");
var check_sms = document.getElementById("sms");
var check_canaldig = document.getElementById("canal_dig");
var check_notpush = document.getElementById("not_push");
var check_otro = document.getElementById("otro");

//En esta lista se ponen los id de los checkbox creados
var lista = [check_email,check_call,check_pagweb,check_atm,check_bel,check_sms,check_canaldig,check_notpush,check_otro];
    
//la variable valor obtiene el value del chekbox, ese value de lo asignamos con los indices de la consulta
function validarCheckbox(valor){

    var contador = 0;
    var validador = 0;

    while(contador!=lista.length-1){
        if(lista[contador].checked){
            validador++;
            if(validador==6){
                desactivarCheckbox();
            }
            else{
                activarCheckbox();
            }
        }
        contador++;
    }
    
}

function desactivarCheckbox(){
    
    var contador = 0;
    
    while(contador!=lista.length){

        if(!lista[contador].checked){
            lista[contador].disabled = true;
        }
        contador++;
    }
   
}
function activarCheckbox(){
    
    var contador = 0;
    
    while(contador!=lista.length){

        lista[contador].disabled = false;
        contador++;
    }
   
}

function determinarCodigoCanales(){ // esta función determina el consecutivo Ejemplo:000012

    var codigo_creado = '';
    var contador = 0;

    while(contador!=lista.length-1){
        
        if(lista[contador].checked){
            codigo_creado = codigo_creado + (contador+1).toString();
        }
        contador++; 
    }
    
    var contador2 = 6 - codigo_creado.length;

    while(contador2!=0){
        codigo_creado = '0' + codigo_creado; 
        contador2--;
    }
    alert(codigo_creado);
    
}