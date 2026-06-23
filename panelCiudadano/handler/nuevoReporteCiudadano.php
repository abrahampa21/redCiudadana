<?php

require_once('../src/config/connection.php');

if ($_SERVER["REQUEST_METHOD" !== "POST"]){
    exit;
}

$sesion = $_SESSION['id_usuario']; //id del usuario en sesion

//datos del formulario
$titulo = trim($_POST["titulo"] ?? "");
$desc = trim($_POST["descripcion"] ?? "");
$categoria = intval($_POST["id_categoria"] ?? -1);
$prioridad = intval($_POST["id_prioridad"] ?? -1);
$ubicacion = trim($_POST["ubicacion"] ?? "");
//todo $evidencia ... url de la carpeta ?

//validaciones
if($titulo === "" || $desc === "" || $ubicacion === "" || $prioridad === -1 || $categoria === -1){
    exit;
}