var urlGetArticulo = 'http://34.68.196.220:90/G4_20/Articulos/controller/Articulos.php?op=GetArticulos';
var urlPostArticulo='http://34.68.196.220:90/G4_20/Articulos/controller/Articulos.php?op=InsertArticulo';
var urlGetUno = 'http://34.68.196.220:90/G4_20/Articulos/controller/Articulos.php?op=GetUno';
var urlPutArticulo = 'http://34.68.196.220:90/G4_20/Articulos/controller/Articulos.php?op=ActualizarArticulo';
var urlDeleteArticulo = 'http://34.68.196.220:90/G4_20/Articulos/controller/Articulos.php?op=EliminarArticulo';
$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: urlGetArticulo,
        type: 'GET',
        datatype: 'JSON',
        success: function name(response){
            var MiArticulo = response;
            var valores='';

            for(i=0; i<MiArticulo.length; i++){
                valores += '<tr>'+
                '<td>'+MiArticulo[i].ID+'</td>'+
                '<td>'+MiArticulo[i].DESCRIPCION+'</td>'+
                '<td>'+MiArticulo[i].UNIDAD+'</td>'+
                '<td>'+MiArticulo[i].COSTO+'</td>'+
                '<td>'+MiArticulo[i].PRECIO+'</td>'+
                '<td>'+MiArticulo[i].APLICA_ISV+'</td>'+
                '<td>'+MiArticulo[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+MiArticulo[i].ESTADO+'</td>'+
                '<td>'+MiArticulo[i].ID_SOCIO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarArticulo('+MiArticulo[i].ID +')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+MiArticulo[i].ID +')">Eliminar</button>'+
                '</tr>';
                $('.Articulos').html(valores);
            }
        }
    });
}

function AgregarArticulo(){
    var datosarticulo={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosjson=JSON.stringify(datosarticulo);
    
    $.ajax({
        url: urlPostArticulo,
        type: 'POST',
        data:datosjson,
        datatype: 'JSON',
        contenttype:'application/json',
        success: function(response) {
            console.log(response);
        }

    });
    alert("Articulo Agregado");
}

function CargarArticulo(idarticulo) {
    var datosarticulo = {
        ID: idarticulo
    };
    var datosjson= JSON.stringify(datosarticulo);

    $.ajax({
        url: urlGetUno,
        type: 'POST',
        data:datosjson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            var MiArticulo = response;
            $('#DESCRIPCION').val(MiArticulo[0].DESCRIPCION);
            $('#UNIDAD').val(MiArticulo[0].UNIDAD);
            $('#COSTO').val(MiArticulo[0].COSTO);
            $('#PRECIO').val(MiArticulo[0].PRECIO);
            $('#APLICA_ISV').val(MiArticulo[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiArticulo[0].PORCENTAJE_ISV);
            $('#ID_SOCIO').val(MiArticulo[0].ID_SOCIO);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo('+MiArticulo[0].ID +')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
            
        }
    });
    
}

function ActualizarArticulo(idarticulo){
    var datosarticulo = {
        ID: idarticulo,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosjson= JSON.stringify(datosarticulo);

    $.ajax({
        url: urlPutArticulo,
        type: 'PUT',
        data:datosjson,
        dataType:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Articulo Actualizado");
}

function EliminarArticulo(idarticulo) {
    var datosarticulo = {
        ID: idarticulo
    };
    var datosjson= JSON.stringify(datosarticulo);
    $.ajax({
        url: urlDeleteArticulo,
        type: 'DELETE',
        data:datosjson,
        dataType:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Articulo Eliminado");
    //Se refresca la pagina despues de elminar el registro seleccionado
    location.reload();
}