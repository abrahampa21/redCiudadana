<?php
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: GET, POST"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        //evidencia de un reporte especifico (admin)
        //endpoint: http://localhost/redciudadana/src/api/evidencias_api.php?id_evidence=1
        if (isset($_GET['id_evidence'])) {
            $id = intval($_GET['id_evidence']);
            $stmt = $conn->prepare("SELECT * FROM evidencias WHERE id_evidence = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $evidencia = $resultado->fetch_assoc();
                echo json_encode($evidencia);
            } else {
                echo json_encode(array("mensaje" => "Evidencia no encontrada o inexistente"));
            }
            $stmt->close();
            $conn->close();
        }
        else {
        //obtener todas las evidencias
        //endpoint: http://localhost/redciudadana/src/api/evidencias_api.php
        $stmt = $conn->prepare("SELECT * FROM evidencias");
            $stmt->execute();
            $resultado = $stmt->get_result();
            $evidencias = array();
            while ($row = $resultado->fetch_assoc()) {
                $evidencias[] = $row;

            }
            $respuesta = json_encode($evidencias);
            echo $respuesta;
            $stmt->close();
            $conn->close();
        }
        break;
    case 'POST':
        //crear evidencias (ciudadano)
        //endpoint http://localhost/redciudadana/src/api/evidencias_api.php
        $data = json_decode(file_get_contents("php://input"), true);

        $id_reporte = $_GET['id_reporte'] ?? null;
        
        $nombre_archivo = trim($data['titulo'] ?? "");
        $ruta_archivo = trim($data['descripcion'] ?? "");

        if(!empty($id_reporte) && !empty($nombre_archivo) && !empty($ruta_archivo)){
            $stmt = $conn->prepare("INSERT INTO evidencias (nombre_archivo, ruta_archivo, id_reporte) VALUES (?, ?, ?)");
            $stmt->bind_param("ssi", $nombre_archivo, $ruta_archivo, $id_reporte);
            if($stmt->execute()){
                http_response_code(201);
                echo json_encode(array("mensaje" => "Evidencia creada exitosamente"));
            }else{
                http_response_code(500);
                echo json_encode(array("mensaje" => "Error al crear la evidencia " . $stmt->error));
            }
        }else{
            http_response_code(400);
            echo json_encode(array("mensaje" => "Todos los datos son obligatorios"));
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(array("mensaje" => "Método no válido"));
        break;
}