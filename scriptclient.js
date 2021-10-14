function obtenerItems(){

    $.ajax({
        dataType: 'json',
        url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:'GET',
        
        success:function(response) {
         console.log(response);
         mostrarTabla(response.items);
         $("#id").val("");
         $("#NAME").val("");
         $("#EMAIL").val("");
         $("#AGE").val("");
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
    $("#Mi").append("<th>NOMBRE</th>");
    $("#Mi").append("<th>EMAIL</th>");
    $("#Mi").append("<th>AÑO</th>");
    $("#Mi").append("<th>BORRAR</th>");
    $("#Mi").append("<th>CARGAR</th>");
    $("#Mi").append("</tr>");
    for(i=0;i<misItems.length;i++){ 
      $("#miResultado").append("<tr>");
      $("#miResultado").append("<td>"+misItems[i].id+"</td>");
      $("#miResultado").append("<td>"+misItems[i].name+"</td>");
      $("#miResultado").append("<td>"+misItems[i].email+"</td>");
      $("#miResultado").append("<td>"+misItems[i].age+"</td>");
      $("#miResultado").append('<td><button class="boton_1" onclick="borrar('+misItems[i].id+')">Borrar</button></td>');
      $("#miResultado").append('<td><button class="boton_1" onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>');
      $("#miResultado").append("</tr>");
  
    }
    //var filaTabla = '<tr><td>' + misItems[i].id + '</td><td>' + misItems[i].brand + '</td><td>' + misItems[i].model + '</td><td>' + misItems[i].category_id + '</td><td>' + misItems[i].name + '</td></tr>';
    //tableBody.append(filaTabla);
    
  }
  function registro(){
  var elemento={
    id:$("#id").val(),
    name:$("#NAME").val(),
    email:$("#EMAIL").val(),
    age:$("#AGE").val()
    
  }
  
  var dataToSend=JSON.stringify(elemento);
  //JSON= JavaScript Object Notation
  $.ajax({
        dataType:'json',
        data:elemento,
        url:" https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:'POST',
  
        success:function(response) {
          console.log(response);
          mostrarTabla(response.items);
          $("#miResultado").empty();
          $("#id").val("");
         $("#NAME").val("");
         $("#EMAIL").val("");
         $("#AGE").val("");
         alert('Cliente creado');
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
          alert("No se pudo guardar")  
        }
    });
  
  }
  
  function obtenerItemEspecifico(idItem){
  
    $.ajax({
        dataType: 'json',
        url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:'GET',
        contenty:'aplication/json',
        success: function(response) {
          console.log(response);
          var item=response.items[idItem];
  
          $("#id").val(item.id);
          $("#NAME").val(item.name);
          $("#EMAIL").val(item.email);
          $("#AGE").val(item.age);
          
  
  
  
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
          alert('ha sucedido un problema, no se ha podido obtener el item'); 
        }
    });
  
  }
  
  function actualizar(){
    
    var elemento={
        id:$("#id").val(),
        name:$("#NAME").val(),
        email:$("#EMAIL").val(),
        age:$("#AGE").val()
    }
    
   
  
  
  var dataToSend=JSON.stringify(elemento);
  //JSON= JavaScript Object Notation
  $.ajax({
    dataType:'json',
    data:dataToSend,
    url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
    type:'PUT',
    contentType:'application/json',
    success:function(response) {
      console.log(response);
      $("#miResultado").empty();
      $("#id").val("");
         $("#NAME").val("");
         $("#EMAIL").val("");
         $("#AGE").val("");
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
          url:"https://g7af19db8ca09dc-db202109272259.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
          type:'DELETE',
          contentType:'application/json',
          success:function(response) {
            $("#miResultado").empty();
            $("#id").val("");
            $("#NAME").val("");
            $("#EMAIL").val("");
            $("#AGE").val("");
            obtenerItems();
            alert('Se ha Eliminado');
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    }