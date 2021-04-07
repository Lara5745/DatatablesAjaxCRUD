<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$tarea = (isset($_POST['tarea'])) ? $_POST['tarea'] : '';
$actividad = (isset($_POST['actividad'])) ? $_POST['actividad'] : '';
$estadoActividad = (isset($_POST['estadoActividad'])) ? $_POST['estadoActividad'] : '';
$avance = (isset($_POST['avance'])) ? $_POST['avance'] : '';
$area = (isset($_POST['area'])) ? $_POST['area'] : '';
$prioridad = (isset($_POST['prioridad'])) ? $_POST['prioridad'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idactividad = (isset($_POST['idactividad'])) ? $_POST['idactividad'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO actividades (Tarea, Actividad, EstadoDeLaActividad, AvancePorcentaje, Area, PrioridadDeLaActividad) VALUES('$tarea', '$actividad', '$estadoActividad', '$avance', '$area', '$prioridad') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM actividades ORDER BY IdActividad DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE actividades SET Tarea='$tarea', Actividad='$actividad', EstadoDeLaActividad='$estadoActividad', AvancePorcentaje='$avance', Area='$area', PrioridadDeLaActividad='$prioridad' WHERE IdActividad='$idactividad' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM actividades WHERE IdActividad='$idactividad' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM actividades WHERE IdActividad='$idactividad' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM actividades";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;