<?php
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    if (!isset($_FILES["evidencia"]) || $_FILES["evidencia"]["error"] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["mensaje" => "No se recibió un archivo válido"]);
        exit;
    }

    $archivo = $_FILES["evidencia"];
    $extension = strtolower(pathinfo($archivo["name"], PATHINFO_EXTENSION));
    $permitidos = ["jpg","jpeg","png","webp","heic","hevc","jfif"];

    if(!in_array($extension,$permitidos)){
        http_response_code(400);
        echo json_encode(["mensaje" => "Formato de imagen no permitido"]);
        exit;
    }

    $nombre = uniqid("evidencia_") . "." . $extension;
    $ruta_destino = "../uploads/evidencias_reportes/" . $nombre;
    $ruta_relativa = "uploads/evidencias_reportes/" . $nombre;

    if(move_uploaded_file($archivo["tmp_name"],$ruta_destino)){
        http_response_code(201);
        echo json_encode(["mensaje" => "Archivo subido exitosamente", "nombre_archivo" => $archivo["name"], "ruta_archivo" => $ruta_relativa]);
    }else{
        http_response_code(500);
        echo json_encode(["mensaje" => "Error al mover el archivo"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["mensaje" => "Método no válido"]);
}
