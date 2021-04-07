$(document).ready(function() {
    var idactividad, opcion;
    opcion = 4;

    tablaUsuarios = $('#tablaUsuarios').DataTable({
        "ajax": {
            "url": "bd/crud.php",
            "method": 'POST', //usamos el metodo POST
            "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
            "dataSrc": ""
        },
        "columns": [ //Son las columnas que estan en la base de datos y seran mostradas en la tabla
            { "data": "IdActividad" },
            { "data": "Tarea" },
            { "data": "Actividad" },
            { "data": "EstadoDeLaActividad" },
            // {
            //     data: null,
            //     render: function(data, type, row) {
            //         // Combine the first and last names into a single table field
            //         return data.IdActividad + ' ' + data.Tarea;
            //     }
            // },
            { "data": "AvancePorcentaje" },
            { "data": "Area" },
            { "data": "PrioridadDeLaActividad" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
        ],
        //Para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });

    var fila; //captura la fila, para editar o eliminar
    //submit para el Alta y Actualización
    $('#formUsuarios').submit(function(e) {
        e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
        tarea = $.trim($('#tarea').val());
        actividad = $.trim($('#actividad').val());
        estadoActividad = $.trim($('#estadoActividad').val());
        avance = $.trim($('#avance').val());
        area = $.trim($('#area').val());
        prioridad = $.trim($('#prioridad').val());
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            datatype: "json",
            data: { idactividad: idactividad, tarea: tarea, actividad: actividad, estadoActividad: estadoActividad, avance: avance, area: area, prioridad: prioridad, opcion: opcion },
            success: function(data) {
                tablaUsuarios.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });



    //para limpiar los campos antes de dar de Alta una Persona
    $("#btnNuevo").click(function() {
        opcion = 1; //alta           
        idactividad = null;
        $("#formUsuarios").trigger("reset");
        $(".modal-header").css("background-color", "#17a2b8");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Alta de Usuario");
        $('#modalCRUD').modal('show');
    });

    //Editar        
    $(document).on("click", ".btnEditar", function() {
        opcion = 2; //editar
        fila = $(this).closest("tr");
        idactividad = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
        tarea = fila.find('td:eq(1)').text();
        actividad = fila.find('td:eq(2)').text();
        estadoActividad = fila.find('td:eq(3)').text();
        avance = fila.find('td:eq(4)').text();
        area = fila.find('td:eq(5)').text();
        prioridad = fila.find('td:eq(6)').text();
        $("#tarea").val(tarea);
        $("#actividad").val(actividad);
        $("#estadoActividad").val(estadoActividad);
        $("#avance").val(avance);
        $("#area").val(area);
        $("#prioridad").val(prioridad);
        $(".modal-header").css("background-color", "#007bff");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Usuario");
        $('#modalCRUD').modal('show');
    });

    //Borrar
    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        idactividad = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 3; //eliminar        
        var respuesta = confirm("¿Está seguro de borrar el registro " + idactividad + "?");
        if (respuesta) {
            $.ajax({
                url: "bd/crud.php",
                type: "POST",
                datatype: "json",
                data: { opcion: opcion, idactividad: idactividad },
                success: function() {
                    tablaUsuarios.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    });

});