!function(n){var a={};function o(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=n,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=22)}([function(e,t,n){"use strict";function k(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){i=!0,r=e},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw r}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,"a",function(){return a});var s,R="https://bac-id-new.azurewebsites.net",i=[],a=(s=function(e,t){var n=new XMLHttpRequest;n.open("GET",R+"/eliminar_bac_id/eliminar_bacid.php?cod_bacid="+t+"&id_usuario="+e,!0),n.send(),n.onreadystatechange=function(){4==this.readyState&&this.status}},{getUser:function(){var e=document.getElementById("userName"),t=localStorage.getItem("name"),n=JSON.parse(t),a=n[1],o=n[2];e.innerText=a+" "+o},seeCode:function(e){if(1!=confirm("Esta seguro que desea visualizar este Código?"))return!1;var t=e.closest("tr"),n=t.cells[0].textContent,a=t.cells[0].childNodes[1].value.toString(),o=localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];return JSON.parse(localStorage.getItem("items")),o.push(n,a),localStorage.setItem("items",JSON.stringify(o)),window.top.location.href="codigo.html",!0},deleteCode:function(e){var t=prompt("Está seguro que desea eliminar este Código? ","Contraseña..."),n=localStorage.getItem("name"),a=JSON.parse(n).toString().split(",")[0];if(t!=i)return alert("Error!. Ingrese de manera correcta su contraseña!"),!1;var o=e.closest("tr").cells[0].childNodes[1].value.toString();s(a,o);var r=e.parentNode.parentNode.rowIndex;return document.getElementById("tableDeleteBACID").deleteRow(r),alert("El código de campaña fue eliminado con éxito!!"),!0},consultaHistoricoBACID:function(u){var e=localStorage.getItem("name"),t=JSON.parse(e)[3],m=document.getElementById("t03"),n=new XMLHttpRequest;n.open("GET",R+"/consulta_bacid_historicos/consulta_historico_bacids.php?nombre_pais="+t,!0),n.send(),n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=m.insertRow(0),o=a.insertCell(0),r=a.insertCell(1),s=a.insertCell(2),i=a.insertCell(3),l=a.insertCell(4),c=a.insertCell(5),d=a.insertCell(6);a.insertCell(7),o.innerHTML=n.nombre_bac_id+"<input type='hidden' value='"+n.id+"'>",r.innerHTML=n.nombre_campana,s.innerHTML=n.nombre_pais,i.innerHTML=n.nombre_origen,l.innerHTML=n.nombre_categoria,c.innerHTML=n.nombre_producto,d.classList.add("text-center"),"consultar"==u&&(d.innerHTML="<button onclick='getConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='"+n.nombre_bac_id+"' name='"+n.nombre_bac_id+"'/><i class='fas fa-eye'></i></button>"),"eliminar"==u&&(d.innerHTML="<button onclick='deleteConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='"+n.nombre_bac_id+"' name='"+n.nombre_bac_id+"'/><i class='fas fa-trash'></i></button>")}}catch(e){t.e(e)}finally{t.f()}}}},filters:function(e,t,n,a,u){var m=document.getElementById("t03"),o=e,r=t,s=n,i=a,l=new XMLHttpRequest;l.open("GET",R+"/consulta_bacid_historicos/consulta_bac_id_filtros.php?nombre_campana="+o+"&nombre_pais="+r+"&fecha_desde="+s+"&fecha_hasta="+i,!0),l.send(),l.onreadystatechange=function(){if(4==this.readyState&&200==this.status){document.getElementById("t03").innerHTML="";var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=m.insertRow(0),o=a.insertCell(0),r=a.insertCell(1),s=a.insertCell(2),i=a.insertCell(3),l=a.insertCell(4),c=a.insertCell(5),d=a.insertCell(6);o.innerHTML=n.nombre_bac_id+"<input type='hidden' value='"+n.id+"'>",r.innerHTML=n.nombre_campana,s.innerHTML=n.nombre_pais,i.innerHTML=n.nombre_origen,l.innerHTML=n.nombre_categoria,c.innerHTML=n.nombre_producto,d.classList.add("text-center"),"consultar"==u&&(d.innerHTML="<button onclick='getConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='"+n.nombre_bac_id+"' name='"+n.nombre_bac_id+"'/><i class='fas fa-eye'></i></button>"),"eliminar"==u&&(d.innerHTML="<button onclick='deleteConfirmation(this);' class='btn btn-outline-primary' value='ver' type='button' id='"+n.nombre_bac_id+"' name='"+n.nombre_bac_id+"'/><i class='fas fa-trash'></i></button>")}}catch(e){t.e(e)}finally{t.f()}}}},validatePassUser:function(){var e=localStorage.getItem("name"),t=JSON.parse(e).toString().split(",")[0],n=new XMLHttpRequest;n.open("GET",R+"/consultas_usuario/validar_contrasena.php?id_usuario="+t,!0),n.send(),n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;i.push(n.contrasena)}}catch(e){t.e(e)}finally{t.f()}}}},consularBACIDcreado:function(d){var e=localStorage.getItem("items"),t=JSON.parse(e),n=t.shift(),a=t.pop(),o=parseInt(a),c=n,u=o;console.log(u);var r=new XMLHttpRequest;r.open("GET",R+"/consulta_bacid_historicos/consulta_detalle_bacid.php?id="+u,!0),r.send(),r.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;document.getElementById("detalle_raiz_codigo").innerHTML=n.nombre_bac_id+"-00-000-00-00000/"+n.nombre_campana.toUpperCase()+"<div class='col-12 text-center'><button onclick='getCopyCode(this);'  class='btn btn-outline-primary w-100 mt-2 copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button></div>",document.getElementById("detalle_nombre_campana").innerHTML=n.nombre_campana,document.getElementById("detalle_creacion").innerHTML=n.fecha_creacion,document.getElementById("detalle_pais").innerHTML=n.nombre_pais,document.getElementById("detalle_origen").innerHTML=n.nombre_origen,document.getElementById("detalle_categoria").innerHTML=n.nombre_categoria,document.getElementById("detalle_producto").innerHTML=n.nombre_producto,document.getElementById("detalle_portafolio").innerHTML=n.nombre_portafolio,document.getElementById("detalle_tipocampana").innerHTML=n.nombre_tipo,document.getElementById("detalle_objetivos").innerHTML=n.nombre_objetivo,document.getElementById("detalle_canaldigital").innerHTML=n.nombre_canal_digital,d=n.nombre_bac_id}}catch(e){t.e(e)}finally{t.f()}s=c.substring(14,20),i=[],(l=new XMLHttpRequest).open("GET",R+"/insertar_bac_id/consulta_canales_insertados.php?canal1_seleccionado="+s.substring(0,1)+"&canal2_seleccionado="+s.substring(1,2)+"&canal3_seleccionado="+s.substring(2,3)+"&canal4_seleccionado="+s.substring(3,4)+"&canal5_seleccionado="+s.substring(4,5)+"&canal6_seleccionado="+s.substring(5,6),!0),l.send(),l.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);""==!e[0].nombre_canal1&&i.push(e[0].nombre_canal1),""==!e[1].nombre_canal2&&i.push(e[1].nombre_canal2),""==!e[2].nombre_canal3&&i.push(e[2].nombre_canal3),""==!e[3].nombre_canal4&&i.push(e[3].nombre_canal4),""==!e[4].nombre_canal5&&i.push(e[4].nombre_canal5),""==!e[5].nombre_canal6&&i.push(e[5].nombre_canal6)}document.getElementById("detalle_canales").innerHTML=i},a=u,o=[],(r=new XMLHttpRequest).open("GET",R+"/consulta_bacid_historicos/consulta_detalle_subacid.php?id="+a,!0),r.send(),r.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;o.push(n.nombre_subbacid)}}catch(e){t.e(e)}finally{t.f()}}!function(e){for(var t=0;t<e.length;t++){var n=new XMLHttpRequest;n.open("GET",R+"/insertar_bac_id/consulta_sub_bacids_postinsercion.php?nombre_grupo="+e[t].split("-")[0]+"&codigo_anuncio="+e[t].split("-")[1]+"&nombre_anuncio="+e[t].split("-")[2]+"&sub_codigo="+e[t],!0),n.send(),n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=document.getElementById("t06").insertRow(1),o=a.insertCell(0),r=a.insertCell(1),s=a.insertCell(2),i=a.insertCell(3),l=a.insertCell(4),c=a.insertCell(5);o.innerHTML=n.nombre_categoria,r.innerHTML=n.descripcion,s.innerHTML=n.nombre_tipo_anuncio,i.innerHTML=n.nombre_anuncio,l.innerHTML=d.toUpperCase()+"-"+n.sub_codigo.toUpperCase(),c.innerHTML="<button onclick='getCopy(this);'  class='btn btn-outline-primary copiar' value='' type='button' id='' name=''/><i class='far fa-copy'></i></button>"}}catch(e){t.e(e)}finally{t.f()}}}}}(o)}}var a,o,r,s,i,l}},editBACIDcreado:function(){var v="",e=localStorage.getItem("items"),t=JSON.parse(e),n=t.shift(),a=t.pop(),o=parseInt(a),_="",E="",I="",B="",T="",S="",L="",C="",w="",x="",M="",H=n,r=n.split("-")[2];console.log(r);var N=o;function O(e,t){for(var n=0;n<e.options.length;n++)e[n].id==t&&(document.getElementById(t).selected="true")}console.log(N),setTimeout(function(){var b=new XMLHttpRequest;b.open("GET",R+"/consulta_bacid_historicos/consulta_detalle_bacid.php?id="+N,!0),b.send(),b.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);console.log(e);var t,n=k(e);try{for(n.s();!(t=n.n()).done;){var a=t.value,o=a.nombre_bac_id.split("-");switch(console.log(o),_=o[7],B=o[1],T=o[2],S=o[4],w=o[5],M=o[6],E=document.getElementById("dllChannel"),I=document.getElementById("dllCategory"),L=document.getElementById("dllportfolio"),C=document.getElementById("dllgetCampaignType"),x=document.getElementById("dllObjective"),document.getElementById("txtCampaignCode").value=a.nombre_bac_id.toUpperCase(),document.getElementById("txtCampaignName").value=a.nombre_campana.toUpperCase(),document.getElementById("datepicker").value=a.fecha_creacion,a.nombre_pais){case"Guatemala":document.getElementById("Guatemala").selected="true";break;case"Costa Rica":document.getElementById("Costa Rica").selected="true";break;case"El Salvador":document.getElementById("Salvador").selected="true";break;case"Honduras":document.getElementById("Honduras").selected="true";break;case"Panamá":document.getElementById("Panama").selected="true";case"Nicaragua":document.getElementById("Nicaragua").selected="true";break;default:document.getElementById("Seleccion").selected="true"}switch(a.nombre_origen){case"Banco":document.getElementById("Banco").selected="true";break;case"Tarjeta Crédito":document.getElementById("Tarjeta Crédito").selected="true";break;case"BAC Credomatic":document.getElementById("BAC Credomatic").selected="true";break;case"No cliente":document.getElementById("No cliente").selected="true"}for(var r=function(t){I[t].id==B&&(document.getElementById(B).selected="true",console.log(I[t].value),setTimeout(function(){var e;e=I[t].value,b.open("GET",R+"/consultas_para_dropdownlist/obtener_producto.php?categoria="+e,!0),b.send(),b.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=n.nombre_producto,o=n.codigo;document.getElementById("dllProducts").innerHTML+="<option value='"+a+"' id='"+o+"'>"+a+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},450))},s=0;s<I.options.length;s++)r(s);O(L,S),O(C,w),O(x,M);for(var i=0;i<E.options.length;i++)E[i].id==_&&(document.getElementById(_).selected="true");a.nombre_bac_id}}catch(e){n.e(e)}finally{n.f()}p=H.substring(14,20),g=[],(y=new XMLHttpRequest).open("GET",R+"/insertar_bac_id/consulta_canales_insertados.php?canal1_seleccionado="+p.substring(0,1)+"&canal2_seleccionado="+p.substring(1,2)+"&canal3_seleccionado="+p.substring(2,3)+"&canal4_seleccionado="+p.substring(3,4)+"&canal5_seleccionado="+p.substring(4,5)+"&canal6_seleccionado="+p.substring(5,6),!0),y.send(),y.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);""==!e[0].nombre_canal1&&g.push(e[0].nombre_canal1),""==!e[1].nombre_canal2&&g.push(e[1].nombre_canal2),""==!e[2].nombre_canal3&&g.push(e[2].nombre_canal3),""==!e[3].nombre_canal4&&g.push(e[3].nombre_canal4),""==!e[4].nombre_canal5&&g.push(e[4].nombre_canal5),""==!e[5].nombre_canal6&&g.push(e[5].nombre_canal6)}for(var t=0;t<g.length;t++)switch(g[t]){case"CANALES DIGITALES":document.getElementById("canal_dig").checked=!0,document.getElementById("nextBtnThird").classList.add("d-inline"),document.getElementById("nextBtnThird").disabled=!1,document.getElementById("firstSubmit").classList.add("d-none"),document.getElementById("dllChannel").disabled=!1;break;case"CALL CENTER":document.getElementById("call_center").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"BEL":document.getElementById("bel").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"EMAIL":document.getElementById("email").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"SMS":document.getElementById("sms").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"PAGINA WEB":document.getElementById("pag_web").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"OTRO":document.getElementById("otro").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"ATM":document.getElementById("atm").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none");break;case"NOTIFICACIONES PUSH":document.getElementById("not_push").checked=!0,document.getElementById("nextBtnThird").classList.remove("d-inline"),document.getElementById("nextBtnThird").classList.add("d-none"),document.getElementById("firstSubmit").classList.remove("d-none")}var n;n=document.getElementById("dllProducts"),setTimeout(function(){for(var e=0;e<n.options.length;e++)n[e].id==T&&(document.getElementById(T).selected="true")},500)},l=N,c=[],u=d="",(m=new XMLHttpRequest).open("GET",R+"/consulta_bacid_historicos/consulta_detalle_subacid.php?id="+l,!0),m.send(),m.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;c.push(n.nombre_subbacid)}}catch(e){t.e(e)}finally{t.f()}for(var a in c){var o=c[a].split("/");console.log(o);var r=o.shift().split("-");console.log(r);var s=o.pop();console.log(s),(d=document.createElement("SELECT")).classList.add("test"),d.id="testing"+a,u=d.id,d.id="testing"+a,v=r[0].toUpperCase(),document.getElementById("adsWrapper").append(d),f(),document.getElementById(u),console.log(E),h(E.value)}}document.getElementById(v)==v&&(document.getElementById(v).selected="true")}}var l,c,d,u,m,p,g,y};var f=function(){var e,s,t;e=E.value,s=document.getElementsByClassName("test"),(t=new XMLHttpRequest).open("GET",R+"/consultas_para_dropdownlist/obtener_grupos_anuncios.php?canal_digital="+e,!0),t.send(),t.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;)for(var n=e.value,a=0;a<s.length;a++){var o=n.codigo_grupo,r=n.nombre_categoria;s[a].innerHTML+="<option value='"+o+"' id='"+o+"'>"+r+"</option>",console.log(v)}}catch(e){t.e(e)}finally{t.f()}}}},h=function(e){var i="",l=document.getElementsByClassName("dllAd");b.open("GET",R+"/consultas_para_dropdownlist/obtener_tipo_anuncio.php?canal_digital="+e,!0),b.send(),b.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;)for(var n=e.value,a=0;a<l.length;a++){i=a;var o=n.codigo,r=n.nombre,s=r.split(" ").join("");document.getElementsByClassName("dllAd")[i].innerHTML+="<div class='row mt-2'><div class='col-12 col-md-4'><label class='w-100' for=''>Seleccione tipo</label><label><input disabled class='custom-checkbox adCheck "+s+"'type='checkbox'value='"+o+"'name='"+s+"'>"+r+"</label></div><div class='col-12 col-md-4'><label class='col-12' for=''>Nombre de Anuncio</label><input disabled type='text' class='form-control adName' id='' maxlength='5' name='nombre-anuncio' /></div><div class='col-12 col-md-4'><label class='col-12' for=''>Código creado</label><input type='text' class='form-control txtTipoCanal txt"+s+"'maxlength='5' name='codigo' /></div></div><hr>"}}catch(e){t.e(e)}finally{t.f()}}}}},800)},getCountries:function(){var e=new XMLHttpRequest,r=[];e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_paises.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);console.log(e);var t,n=k(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;r.push(a.nombre)}}catch(e){n.e(e)}finally{n.f()}for(var o in r)document.getElementById("dllCountries").innerHTML+="<option value='"+r[o]+"'>"+r[o]+"</option>"}}},insertarUsuario:function(e,t,n,a,o,r,s,i){var l=e,c=t,d=n,u=a,m=o,p=r,g=s,y=i,b=new XMLHttpRequest;b.open("GET","https://bac-id-new.azurewebsites.net/consultas_usuario/insertar_usuario.php?usuario_red="+l+"&contrasena="+c+"&correo="+d+"&tipo_usuario="+u+"&pais="+m+"&nombre="+p+"&apellidos="+g+"&estado"+y,!0),b.send(),b.onreadystatechange=function(){4==this.readyState&&this.status}},buscarUsuario:function(e){var t=e,n=new XMLHttpRequest;n.open("GET","https://bac-id-new.azurewebsites.net/consultas_usuario/buscar_usuario.php?usuario_ingresado="+t,!0),n.send(),n.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=k(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;switch(document.getElementById("txtUserId").value=n.id,document.getElementById("txtNombre").value=n.nombre_usuario,document.getElementById("txtApellido").value=n.apellidos_usuario,document.getElementById("txtUsuarioRed").value=n.usuario_red,document.getElementById("txtEmail").value=n.correo,document.getElementById("txtPassword").value=n.contrasena,o(n.pais),n.tipo_usuario){case"1":document.getElementById("admin").selected="true";break;default:document.getElementById("edit").selected="true"}switch(n.estado){case"1":document.getElementById("dllActive").selected="true";break;default:document.getElementById("dllInactive").selected="true"}}}catch(e){t.e(e)}finally{t.f()}}}},setCountryValue:o,actualizarUsuario:function(e,t,n,a,o,r,s,i,l){var c=e,d=t,u=n,m=a,p=o,g=r,y=s,b=i,f=l,h=new XMLHttpRequest;h.open("GET","https://bac-id-new.azurewebsites.net/consultas_usuario/actualizar_usuario.php?id_usuario="+c+"&usuario_red="+d+"&contrasena="+u+"&correo="+m+"&tipo_usuario="+p+"&pais="+g+"&nombre="+y+"&apellidos="+b+"&estado="+f,!0),h.send(),h.onreadystatechange=function(){4==this.readyState&&this.status}},showUserAdminBtn:function(){var e=localStorage.getItem("country");"REG"!==JSON.parse(e)[0]||document.getElementById("btnUserAdmin").classList.remove("d-none")},name:"procedurs"});function o(e){switch(e){case"GUA":document.getElementById("Guatemala").selected="true",document.getElementById("Guatemala").value="GUA";break;case"CRI":document.getElementById("Costa Rica").selected="true",document.getElementById("Costa Rica").value="CRI";break;case"ESA":document.getElementById("Salvador").selected="true",document.getElementById("Salvador").value="ESA";break;case"HON":document.getElementById("Honduras").selected="true",document.getElementById("Honduras").value="HON";break;case"PAN":document.getElementById("Panama").selected="true",document.getElementById("Panama").value="PAN";case"NIC":document.getElementById("Nicaragua").selected="true",document.getElementById("Nicaragua").value="NIC";break;case"REG":document.getElementById("Regional").selected="true",document.getElementById("Regional").value="REG"}}},function(e,t,n){"use strict";n.d(t,"a",function(){return a});n(3);var a={init:function(){},currentDate:function(e){e.getDay();var t=new Array("1","2","3","4","5","6","7","8","9","10","11","12")[e.getMonth()],n=e.getDate(),a=e.getFullYear(),o=e.getHours(),r=e.getMinutes(),s=e.getSeconds();0<=r&&r<10&&(r="0"+r),0<=s&&s<10&&(s="0"+s);var i=n+"/"+t+"/"+a+" | "+o+":"+r+":"+s;document.getElementById("lastLog").innerHTML=i},timeOfDay:function(){var e=(new Date).getHours();return 1<e&&e<12?"Buenos días: ":12<=e&&e<19?"Buenas tardes: ":"Buenas noches: "},logOut:function(){window.top.location.href="index.html"},name:"header"}},function(e,t,n){},function(e,t,n){e.exports=n(5)()},,function(e,t,n){"use strict";var i=n(6);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,r){if(r!==i){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}var n={array:e.isRequired=e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function s(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){i=!0,r=e},f:function(){try{s||null==n.return||n.return()}finally{if(i)throw r}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}n.d(t,"a",function(){return a});var a={getCountries:function(){var e=new XMLHttpRequest,r=[];e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_paises.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);console.log(e);var t,n=s(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;r.push(a.nombre)}}catch(e){n.e(e)}finally{n.f()}for(var o in r)document.getElementById("dllCountries").innerHTML+="<option value='"+r[o]+"' id='"+r[o]+"'>"+r[o]+"</option>"}}},clientOrigin:function(){var e=new XMLHttpRequest,o=[];e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_origen_clientes.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;o.push(n.nombre_origen)}}catch(e){t.e(e)}finally{t.f()}for(var a in o)document.getElementById("dllClients").innerHTML+="<option value='"+o[a]+"' id='"+o[a]+"'>"+o[a]+"</option>"}}},getCategories:function(){var e=new XMLHttpRequest;e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_categoria.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value;document.getElementById("dllCategory").innerHTML+="<option value='"+n.nombre_categoria+"' id='"+n.codigo+"'>"+n.nombre_categoria+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},getPortfolio:function(){var e=new XMLHttpRequest;e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_portafolio.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=n.nombre_portafolio,o=n.codigo;document.getElementById("dllportfolio").innerHTML+="<option value='"+o+"' id='"+o+"'>"+a+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},getCampaignType:function(){document.getElementById("dllgetCampaignType").innerHTML="<option>Seleccine tipo</option>";var e=new XMLHttpRequest;e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_tipo_campana.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=n.nombre,o=n.codigo;document.getElementById("dllgetCampaignType").innerHTML+="<option value='"+a+"' id='"+o+"'>"+a+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},getObjectives:function(){var e=new XMLHttpRequest;e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_objetivos.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=n.nombre_objetivo,o=n.codigo;document.getElementById("dllObjective").innerHTML+="<option value='"+a+"' id='"+o+"'>"+a+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},getDigitalChannels:function(){var e=new XMLHttpRequest;e.open("GET","https://bac-id-new.azurewebsites.net/consultas_para_dropdownlist/obtener_canal_digital.php",!0),e.send(),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e,t=s(JSON.parse(this.responseText));try{for(t.s();!(e=t.n()).done;){var n=e.value,a=n.nombre,o=n.codigo;document.getElementById("dllChannel").innerHTML+="<option value='"+a+"' id='"+o+"'>"+a+"</option>"}}catch(e){t.e(e)}finally{t.f()}}}},name:"dropDowns"}},,,,,,,,,,,,,,,function(e,t,n){"use strict";n.r(t);n(2);var a=n(1),u=n(0),o=n(7);window.addEventListener("load",s,!1);function m(){return document.getElementById("txtNombre").value}function p(){return document.getElementById("txtApellido").value}function g(){return document.getElementById("txtUsuarioRed").value}function y(){return document.getElementById("txtEmail").value}function b(){return document.getElementById("txtPassword").value}function f(){var e=document.getElementById("dllCountries");return e.options[e.selectedIndex].value}function h(){var e=document.getElementById("dllRol"),t=e.options[e.selectedIndex].value;return parseInt(t)}function v(){var e=document.getElementById("dllState"),t=e.options[e.selectedIndex].value;return parseInt(t)}function _(){document.getElementById("txtSearchUser").value="",document.getElementById("txtUserId").value="",document.getElementById("txtNombre").value="",document.getElementById("txtApellido").value="",document.getElementById("txtUsuarioRed").value="",document.getElementById("txtEmail").value="",document.getElementById("txtPassword").value="",document.getElementById("dllRol").options.selectedIndex=0,document.getElementById("dllCountries").options.selectedIndex=0,document.getElementById("dllState").options.selectedIndex=0}function E(e,t){var n=document.createElement("DIV");n.id="testing",S='<div class="modal showModal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header text-center"><h5 class="modal-title">'+e+'</h5><button type="button" onClick="closeModal(this);" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>'+t+'</p></div><div class="modal-footer"><button type="button" onClick="closeModal(this);" class="btn btn-secondary closeModal" data-dismiss="modal">Cerrar</button></div></div></div></div>',n.innerHTML+=S,document.querySelector("body").appendChild(n)}var r,s=(r=new Date,a.a.currentDate(r),document.getElementById("getting").innerHTML=a.a.timeOfDay(),u.a.getUser(),o.a.getCountries(),void u.a.showUserAdminBtn()),i=document.getElementById("brnLogOut"),l=document.getElementById("btnAddNewUser"),c=document.getElementById("btnEditUser"),d=(document.getElementById("editUserForm"),document.getElementById("btnUserFilter")),I=document.getElementById("btnSaveUser"),B=document.getElementById("btnUpdateUser"),T=document.getElementById("btnResetFilter"),S=(document.querySelector(".closeModal"),"");T.onclick=function(e){e.preventDefault(),_()},I.onclick=function(e){e.preventDefault();var t="",n="",a=m(),o=p(),r=g(),s=y(),i=b(),l=f(),c=h(),d=v();if(a&&o&&r&&s&&i&&l&&c&&d){switch(l){case"Guatemala":l="GUA";break;case"Costa Rica":l="CRI";break;case"Salvador":l="ESA";break;case"Honduras":l="HON";break;case"Panama":l="PAN";case"Nicaragua":l="NIC";break;case"Regional":l="REG"}u.a.insertarUsuario(r,i,s,c,l,a,o,d),E(n+="Registro completado",t+="El usuario de "+a+" "+o+" ha sido creado correctamente. Puede validar los datos del mismo desde el módulo de edición de usuario."),_()}else n+="¡Atención!",t+="Favor complete los siguientes campos antes de guardar el usuario: ",a||(t+="Nombre de usuario, "),o||(t+="coloque al menos un Apellido, "),l&&"Seleccione país"!=l.value||(t+="seleccione el país, "),s||(t+="indique el Correo electrónico, "),i||(t+="ingrese una Contraseña, "),c||(t+="seleccione el rol, "),d||(t+="seleccione estado."),E(n,t)},d.onclick=function(e){e.preventDefault();var t=document.getElementById("txtSearchUser").value,n="",a="";t?u.a.buscarUsuario(t):E(a+="¡Atención!",n+="Favor ingrese usuario de red o correo electrónico")},B.onclick=function(){event.preventDefault();var e="",t=document.getElementById("txtUserId").value,n=m(),a=p(),o=g(),r=y(),s=b(),i=f(),l=h(),c=v();switch(i){case"Guatemala":i="GUA";break;case"Costa Rica":i="CRI";break;case"Salvador":i="ESA";break;case"Honduras":i="HON";break;case"Panama":i="PAN";case"Nicaragua":i="NIC";break;case"Regional":i="REG"}u.a.actualizarUsuario(t,o,s,r,l,i,n,a,c),E("Usuario actualizado",e+="El usuario de: "+n+" "+a+" ha sido actualizado correctamente."),_()},window.closeModal=function(){event.preventDefault();var e=document.querySelector(".showModal");setTimeout(function(){e.parentNode.removeChild(e)},500)},l.onclick=function(){document.querySelector(".identidicador").classList.add("d-none"),document.querySelector(".userEdit").classList.add("d-none"),document.querySelector(".addUser").classList.remove("d-none"),document.querySelector(".serchUser").classList.add("d-none"),I.classList.remove("d-none"),l.classList.add("active"),c.classList.remove("active"),B.classList.add("d-none"),_()},c.onclick=function(){document.querySelector(".identidicador").classList.remove("d-none"),document.querySelector(".addUser").classList.add("d-none"),document.querySelector(".userEdit").classList.remove("d-none"),document.querySelector(".serchUser").classList.remove("d-none"),I.classList.add("d-none"),l.classList.remove("active"),c.classList.add("active"),B.classList.remove("d-none"),_()},i.onclick=function(){return a.a.logOut()}}]);