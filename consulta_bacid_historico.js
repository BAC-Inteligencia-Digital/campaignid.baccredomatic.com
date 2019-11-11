document.querySelector('#botonProbarBACID').addEventListener('click', consultaHistoricoBACID);

var capa_datos4 = "https://bac-id-new.azurewebsites.net/consulta_bacid_historicos/";

function consultaHistoricoBACID(){

        
        const xhttp = new XMLHttpRequest();

        xhttp.open('GET',capa_datos4+'consulta_historico_bacids.php',true);

        xhttp.send();
        
        xhttp.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    let datos = JSON.parse(this.responseText);

                    for(let item of datos){

                        var table = document.getElementById("t03");
                        {
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            var cell5 = row.insertCell(4);
                            var cell6 = row.insertCell(5);
                            var cell7 = row.insertCell(6);
                
                            cell1.innerHTML = item.nombre_bac_id;
                            cell2.innerHTML = item.nombre_campana;
                            cell3.innerHTML = item.nombre_pais;
                            cell4.innerHTML = item.nombre_origen;
                            cell5.innerHTML = item.nombre_categoria;
                            cell6.innerHTML = item.nombre_producto;
                            cell7.innerHTML = "<input value='Presione' text='nano' type='button' id='"+item.nombre_bac_id+"' name='"+item.nombre_bac_id+"'/></Input>";
                        }                        
                    }
                        
                }
                            
        
       
     }

}
