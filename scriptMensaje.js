function obtenerItems(){

    $.ajax({
        dataType: 'json',
        url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:'GET',
        
        success:function(response) {
         console.log(response);
         mostrarTabla(response.items);
         $("#ID").val("");
         $("#MESSAGETEXT").val("");
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
    $("#Mi").append("<th>MENSAJE</th>");
    $("#Mi").append("<th>BORRAR</th>");
    $("#Mi").append("<th>CARGAR</th>");
    $("#Mi").append("</tr>");
    for(i=0;i<misItems.length;i++){ 
      $("#miResultado").append("<tr>");
      $("#miResultado").append("<td>"+misItems[i].id+"</td>");
      $("#miResultado").append("<td>"+misItems[i].messagetext+"</td>");
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
    messagetext:$("#MESSAGETEXT").val()
    
  }
  
  var dataToSend=JSON.stringify(elemento);
  //JSON= JavaScript Object Notation
  $.ajax({
        dataType:'json',
        data:elemento,
        url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:'POST',
  
        success:function(response) {
          console.log(response);
          mostrarTabla(response.items);
          $("#miResultado").empty();
          $("#ID").val("");
         $("#MESSAGETEXT").val("");
         alert('Cliente creado');
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
          alert("No se pudo guardar");
        }
    });
  
  }
  
  function obtenerItemEspecifico(idItem){
  
    $.ajax({
        dataType: 'json',
        url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:'GET',
        contentType:'application/json',
        success: function(response) {
          console.log(response);
          var item=response.items[0];
          var item2=response.items[1]
          
            $("#ID").val(item.id, item2.id);
            $("#MESSAGETEXT").val(item.messagetext, item2.messagetext);
            
            
                
            
            
          
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
          alert('ha sucedido un problema, no se ha podido obtener el item'); 
        }
    });
  
  }
  
  function actualizar(){
    
    var elemento={
        id:$("#ID").val(),
        messagetext:$("#MESSAGETEXT").val()
    }
    
   
  
  
  var dataToSend=JSON.stringify(elemento);
  //JSON= JavaScript Object Notation
  $.ajax({
    dataType:'json',
    data:dataToSend,
    url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
    type:'PUT',
    contentType:'application/json',
    success:function(response) {
      console.log(response);
      
      $("#ID").val("");
        $("#MESSAGETEXT").val("");
        obtenerItems();
        mostrarTabla();
      alert('Se ha actualizado');
      $("#miResultado").empty();
  
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
          url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
          type:'DELETE',
          contentType:'application/json',
          success:function(response) {
            $("#miResultado").empty();
            $("#ID").val("");
            $("#MESSAGETEXT").val("");
            obtenerItems();
            alert('Se ha Eliminado');
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    }