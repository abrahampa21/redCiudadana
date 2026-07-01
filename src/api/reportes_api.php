<?php
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        //filtrar categoria (admin y ciudadano)
        //endpoint http://localhost/redciudadana/src/api/reportes_api.php?id_categoria=2
        if (isset($_GET['id_categoria'])) {
            $id_categoria = intval($_GET['id_categoria']);
            $stmt = $conn->prepare("SELECT * FROM reporte WHERE id_categoria = ?");
            $stmt->bind_param("i", $id_categoria);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $categoria = $resultado->fetch_assoc();
                echo json_encode($categoria);
            } else {
                echo json_encode(array("mensaje" => "Categoria no encontrada"));
            }
            $stmt->close();
            $conn->close();
        }
        //filtrar por estado (admin y ciudadano)
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_estado=2
        elseif (isset($_GET['id_estado'])) {
            $id_estado = intval($_GET['id_estado']);
            $stmt = $conn->prepare("SELECT * FROM reporte WHERE id_estado = ?");
            $stmt->bind_param("i", $id_estado);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $estado = $resultado->fetch_assoc();
                echo json_encode($estado);
            } else {
                echo json_encode(array("mensaje" => "Estado no existente"));
            }
            $stmt->close();
            $conn->close();
        }
        //filtrar por prioridad (admin y ciudadano)
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_prioridad=2
        elseif (isset($_GET['id_prioridad'])) {
            $id_estado = intval($_GET['id_prioridad']);
            $stmt = $conn->prepare("SELECT * FROM reporte WHERE id_prioridad = ?");
            $stmt->bind_param("i", $id_prioridad);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $prioridad = $resultado->fetch_assoc();
                echo json_encode($prioridad);
            } else {
                echo json_encode(array("mensaje" => "Prioridad no existente"));
            }
            $stmt->close();
            $conn->close();
        }
        //obtener reportes (admin y ciudadano)
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php
        else {
            $stmt = $conn->prepare("SELECT * FROM reporte");
            $stmt->execute();
            $resultado = $stmt->get_result();
            $reportes = array();
            while ($row = $resultado->fetch_assoc()) {
                $reportes[] = $row;
            }
            $respuesta = json_encode($reportes);
            echo $respuesta;
            $stmt->close();
            $conn->close();
        }
        break;
    case 'POST':
        //crear reporte (ciudadano)
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php
        $data = json_decode(file_get_contents("php://input"), true);

        $titulo = trim($data['titulo'] ?? "");
        $descripcion = trim($data['descripcion'] ?? "");
        $ubicacion = trim($data['ubicacion'] ?? "");
        $id_categoria = $data['id_categoria'] ?? null;
        $id_prioridades = $data['id_prioridades'] ?? null;
        $id_estado = $data['id_estado'] ?? null;
        
        $id_usuario = $_SESSION['id_usuario'];

        if (!empty($titulo) && !empty($ubicacion)) {
            $stmt = $conn->prepare("INSERT INTO reporte (titulo, descripcion, ubicacion, id_usuario, id_categoria, id_prioridades, id_estado) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssiiii", $titulo, $descripcion, $ubicacion, $id_usuario, $id_categoria, $id_prioridades, $id_estado);
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("mensaje" => "Reporte creado exitosamente"));
            } else {
                http_response_code(500);
                echo json_encode(array("mensaje" => "Error al crear el reporte " . $stmt->error));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("mensaje" => "Todos los datos son obligatorios"));
        }
        break;

    case 'PUT':

        break;
    case 'PATCH':
        //cambiar estado del reporte
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_reporte=2
        if(isset($_GET['id_reporte'])){
            $id_reporte = intval($_GET['id_reporte']);
            $data = json_decode(file_get_contents("php://input"), true);
            $id_estado = intval($data['id_estado'] ?? 0 );

            if(!empty($id_estado)){
                $stmt = $conn->prepare("UPDATE reporte SET id_estado = COALESCE(NULLIF(?, ''), id_estado) WHERE id_reporte = ?");
                $stmt->bind_param("ii", $id_estado, $id_reporte);
                if($stmt->execute()){
                    http_response_code(200); 
                    echo json_encode(array("mensaje" => "Estado cambiado exitosamente"));
                }else{
                    http_response_code(500);
                    echo json_encode(array("mensaje" => "Error al actualizar el estado del reporte " . $stmt->error));
                }
            }else{
                http_response_code(400);
                echo json_encode(array("mensaje" => "El id del estado del reporte es necesario"));
            }
        }
        break;
    default:

        break;
}
