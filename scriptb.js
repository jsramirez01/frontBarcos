
function obtenerItems(){

  $.ajax({
      dataType: 'json',
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'GET',
      
      success:function(response) {
       console.log(response);
       mostrarTabla(response.items);
       $("#ID").val("");
       $("#BRAND").val("");
       $("#MODEL").val("");
       $("#CATEGORY_ID").val("");
       $("#NAME").val("");
       alert('Se muestra la tabla');


      },
      
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert('ha sucedido un problema');
            
      }
  })

}
function mostrarTabla(items) {
  var misItems=items;
  var tableBody = $("#miResultado"); 
  var tableMI = $("#Mi"); 
  $("#Mi").empty();
  $("#miResultado").empty();
  $("#Mi").append("<tr>");     
  $("#Mi").append("<th>ID</th>");
  $("#Mi").append("<th>BRAND</th>");
  $("#Mi").append("<th>MODEL</th>");
  $("#Mi").append("<th>CATEGORY_ID</th>");
  $("#Mi").append("<th>NAME</th>");
  $("#Mi").append("<th>BORRAR</th>");
  $("#Mi").append("<th>CARGAR</th>");
  $("#Mi").append("</tr>");
  for(i=0;i<misItems.length;i++){ 
    $("#miResultado").append("<tr>");
    $("#miResultado").append("<td>"+misItems[i].id+"</td>");
    $("#miResultado").append("<td>"+misItems[i].brand+"</td>");
    $("#miResultado").append("<td>"+misItems[i].model+"</td>");
    $("#miResultado").append("<td>"+misItems[i].category_id+"</td>");
    $("#miResultado").append("<td>"+misItems[i].name+"</td>");
    $("#miResultado").append('<td><button class="boton_1" onclick="borrar('+misItems[i].id+')">Borrar</button></td>');
    $("#miResultado").append('<td><button class="boton_1" onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>');
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
      dataType:'json',
      data:elemento,
      url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'POST',

      success:function(response) {
        console.log(response);
        mostrarTabla(response.items);
        $("#miResultado").empty();
        $("#ID").val("");
        $("#BRAND").val("");
        $("#MODEL").val("");
        $("#CATEGORY_ID").val("");
        $("#NAME").val("");
        obtenerItems();
        alert('Se ha guardado');

      },
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert("No se pudo guardar")  
      }
  });

}

function obtenerItemEspecifico(idItem){

  $.ajax({
      dataType: 'json',
      url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
      type:'GET',
      contenty:'aplication/json',
      success: function(response) {
        console.log(response);
        var item=response.items[1];

        $("#ID").val(item.id);
        $("#BRAND").val(item.brand);
        $("#MODEL").val(item.model);
        $("#CATEGORY_ID").val(item.category_id);
        $("#NAME").val(item.name);



      },
      
      error: function(jqXHR, textStatus, errorThrown) {
        alert('ha sucedido un problema, no se ha podido obtener el item'); 
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
  dataType:'json',
  data:dataToSend,
  url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/boat/boat",
  type:'PUT',
  contentType:'application/json',
  success:function(response) {
    console.log(response);
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
        alert('ha sucedido un problema, no se ha podido obtener el item');
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
