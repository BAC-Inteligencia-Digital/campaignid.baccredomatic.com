!function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=14)}({14:function(e,t,n){"use strict";n.r(t);n(2);var o=document.getElementById("inputEmail"),u=document.getElementById("inputPassword"),r=document.getElementById("btnLogin"),a=document.querySelector(".dangerClose");r.onclick=function(){var r;localStorage.clear();var a,s,i,c,e=o.value,t=u.value,l="";if(e&&t){var n=new XMLHttpRequest;n.open("GET","https://int-dig-bac-id.azurewebsites.net/backend/public/auth/"+e+"/"+t+"/",!0),n.send(),n.onreadystatechange=function(){if(200==this.status){var e=JSON.parse(this.responseText);if(r=e.message.id,a=e.message.nombre,s=e.message.apellidos,i=e.message.pais,c=e.message.estado,r<0||void 0===r)d(l="El usuario o la contraseña es incorrecta, favor intente de nuevo.");else if(0==c)d(l="El usuario se encuentra inactivo, favor comunicarse con el administrador");else{var t=localStorage.getItem("name")?JSON.parse(localStorage.getItem("name")):[],n=localStorage.getItem("country")?JSON.parse(localStorage.getItem("country")):[],o=s.split(" ").shift();n.push(i),t.push(r,a,o,i),localStorage.setItem("name",JSON.stringify(t)),localStorage.setItem("country",JSON.stringify(n)),window.location.href="home.html"}}}}else l+="Favor completar el campo de: ",e||(l+="usuario "),t||(l+="contraseña"),d(l)};var d=function(e){var t=document.querySelector(".alert-danger");document.getElementById("message").innerText="",t.classList.remove("d-none"),t.classList.remove("hide"),document.getElementById("message").innerText=e,t.classList.add("show"),setTimeout(function(){t.classList.add("d-none"),t.classList.add("hide"),t.classList.remove("show")},4e3)};a.onclick=function(){var e=document.querySelector(".alert-danger");e.classList.add("d-none"),e.classList.add("hide"),e.classList.remove("show")}},2:function(e,t,n){}});