var UrlGetPedidos ='http://34.68.196.220:90/G4_20/Pedidos/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido ='http://34.68.196.220:90/G4_20/Pedidos/controller/pedidos.php?op=InsertPedido';
var UrlPutPedido ='http://34.68.196.220:90/G4_20/Pedidos/controller/pedidos.php?op=UpdatePedido';
var UrlGetPedido ='http://34.68.196.220:90/G4_20/Pedidos/controller/pedidos.php?op=GetPedido';
var UrlDeletePedido ='http://34.68.196.220:90/G4_20/Pedidos/controller/pedidos.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success:function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_PEDIDO+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_ENTREGA+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarPedido('+MiItems[i].ID+')">Actualizar</button>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
               '</tr>';
                $('.Pedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedido={
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson=JSON.stringify(datospedido);

    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data:datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Agregado");
}

function CargarPedido(idpedido){
    var datospedido ={
        ID:idpedido
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+MiItems[0].ID+')" value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarPedido(idpedido){
    var datospedido ={
        ID:idpedido,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data:datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}

function EliminarPedido(idpedido){
    var datospedido={
        ID:idpedido
    };
    var datospedidojson=JSON.stringify(datospedido);

    $.ajax({
        url:UrlDeletePedido ,
        type: 'DELETE',
        data:datospedidojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}

