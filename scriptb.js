
function obtenerItems(){

  $.ajax({
      dataType: 'json',
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'GET',
      
      success:function(response) {
       console.log(response);
       mostrarTabla(response.items);
        
      

      },
      
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert('ha sucedido un problema');
            
      }
  })

}
function mostrarTabla(items) {
  var misItems=items;
        var tableBody = $("#miResultado");
        $("#miResultado").append("<colgroup>");
        $("#miResultado").append("<col>");
        $("#miResultado").append("<col>");
        $("#miResultado").append("<col>");
        $("#miResultado").append("<col>");
        $("#miResultado").append("<col>");
        $("#miResultado").append("</colgroup>");
        $("#miResultado").append("<tr>");
        $("#miResultado").append("<th>"+"ID"+"</th>");
        $("#miResultado").append("<th>"+"BRAND"+"</th>");
        $("#miResultado").append("<th>"+"MODEL"+"</th>");
        $("#miResultado").append("<th>"+"CATEGORY"+"</th>");
        $("#miResultado").append("<th>"+"NAME"+"</th>");
        $("#miResultado").append("</tr>");

        for(i=0;i<misItems.length;i++){
          $("#miResultado").append("<tr>");
          $("#miResultado").append("<td>"+misItems[i].id+"</td>");
          $("#miResultado").append("<td>"+misItems[i].brand+"</td>");
          $("#miResultado").append("<td>"+misItems[i].model+"</td>");
          $("#miResultado").append("<td>"+misItems[i].category_id+"</td>");
          $("#miResultado").append("<td>"+misItems[i].name+"</td>");
          $("#miResultado").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button></td>');
          $("#miResultado").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>');
          $("#miResultado").append("</tr>");

        }
        //var filaTabla = '<tr><td>' + misItems[i].id + '</td><td>' + misItems[i].brand + '</td><td>' + misItems[i].model + '</td><td>' + misItems[i].category_id + '</td><td>' + misItems[i].name + '</td></tr>';
        //tableBody.append(filaTabla);
  
}
function registro(){
var elemento={
  id:$("#ID").val(),
  brand:$("#BRAND").val(),
  model:$("#MODEL").val(),
  category_id:$("#CATEGORY_ID").val(),
  name:$("#NAME").val()
  }


var dataToSend=JSON.stringify(elemento);
//JSON= JavaScript Object Notation
$.ajax({
      dataType: 'json',
      data:elemento,
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'POST',
      
      
      success:function(response) {
        $("#miResultado").empty();
        obtenerItems();
        alert('Se ha guardado')
      },
      
      error: function(jqXHR, textStatus, errorThrown) {
          alert("No se pudo guardar")  
      }
  });

}




function borrar(idElemento){
var elemento={
  id:idElemento
};


var dataToSend=JSON.stringify(elemento);
//JSON= JavaScript Object Notation
$.ajax({
      dataType:'json',
      data:dataToSend,
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'DELETE',
      contentType:'application/json',
      success:function(response) {
        $("#miResultado").empty();
        $("#ID").val("");
        $("#BRAND").val("");
        $("#MODEL").val("");
        $("#CATEGORY_ID").val("");
        $("#NAME").val("");
        obtenerItems();
        alert('Se ha Eliminado');
      },
      
      error: function(jqXHR, textStatus, errorThrown) {
            
      }
  });
}


function obtenerItemEspecifico(idItem){
  $.ajax({
      dataType: 'json',
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'GET',
      contenty:'aplication/json',
      success:function(response) {
        console.log(response);
        var item=response.items[0];

        $("#ID").val(item.id);
        $("#BRAND").val(item.brand);
        $("#MODEL").val(item.model);
        $("#CATEGORY_ID").val(item.category_id);
        $("#NAME").val(item.name);



      },
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert('ha sucedido un problema no se a podido obtener el item'); 
      }
  });

}

function actualizar(){
  var elemento={
    id:$("#ID").val(),
  brand:$("#BRAND").val(),
  model:$("#MODEL").val(),
  category_id:$("#CATEGORY_ID").val(),
  name:$("#NAME").val()
    }


var dataToSend=JSON.stringify(elemento);
//JSON= JavaScript Object Notation
$.ajax({
      dataType: 'json',
      data:dataToSend,
      contentType:'application/json',
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'PUT',  
      success:function(response) {
        $("#miResultado").empty();
        $("#ID").val("");
        $("#BRAND").val("");
        $("#MODEL").val("");
        $("#CATEGORY_ID").val("");
        $("#NAME").val("");
        obtenerItems();
        alert('Se ha actualizado');
      },
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert('ha sucedido un problema no se a podido obtener el item');
      }
  });

}


