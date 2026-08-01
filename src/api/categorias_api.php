<?php
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        //Retornar todas las categorías
        // http://localhost/redCiudadana/src/api/categorias_api.php
        $query = $conn->prepare("SELECT id_categoria,nombre,descripcion FROM categoria");
        if (!$query->execute()) {
            http_response_code(500);
            echo json_encode(["mensaje" => "No se pudieron consultar las categorías"]);
            break;
        }
        $resultado = $query->get_result();
        $categorias = $resultado->fetch_all(MYSQLI_ASSOC);
        http_response_code(200);
        echo json_encode($categorias);
        $query->close();
        $conn->close();
        break;
    default:
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método no válido"));
        break;
}
