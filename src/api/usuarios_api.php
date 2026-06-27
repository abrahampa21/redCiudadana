<?php
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        //mostrar todos los usuarios (ciudadanos)
        //endpoint: http://localhost/redciudadana/src/api/usuarios_api.php?id_rol=true
        $stmt = $conn->prepare("SELECT * FROM usuario WHERE id_rol = 2");
            $stmt->execute();
            $resultado = $stmt->get_result();
            $usuarios = array();
            while ($row = $resultado->fetch_assoc()) {
                $usuarios[] = $row;

            }
            $respuesta = json_encode($usuarios);
            echo $respuesta;
            $stmt->close();
            $conn->close();
        break;
    case 'POST':
        
        break;

    case 'PUT':

        break;
    case 'PATCH':
        //habilitar/deshabilitar una cuenta de un ciudadano (admin)
        if(isset($_GET['id_usuario'])){
            $id_usuario = intval($_GET['id_usuario']);
            $data = json_decode(file_get_contents("php://input"), true);
            $id_rol = intval($data['id_rol'] ?? 0 );

            if(!empty($id_usuario)){
                $stmt = $conn->prepare("UPDATE usuario SET id_rol = COALESCE(NULLIF(?, ''), id_rol) WHERE id_usuario = ?");
                $stmt->bind_param("ii", $id_rol, $id_usuario);
                if($stmt->execute()){
                    http_response_code(200); 
                    echo json_encode(array("mensaje" => "Rol cambiado exitosamente"));
                }else{
                    http_response_code(500);
                    echo json_encode(array("mensaje" => "Error al actualizar el rol del usuario " . $stmt->error));
                }
            }else{
                http_response_code(400);
                echo json_encode(array("mensaje" => "El id del rol del usuario es necesario"));
            }
        }
        break;
    case 'DELETE':

        break;
    default:

        break;
}