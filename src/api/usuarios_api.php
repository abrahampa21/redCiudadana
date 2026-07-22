<?php
session_start();
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PATCH");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        //Obtener usuarios por id_usuario
        // http://localhost/redciudadana/src/api/usuarios_api.php?id_usuario=
        if (isset($_GET["id_usuario"])) {
            if (!isset($_SESSION['id_usuario'])) {
                http_response_code(401);
                echo json_encode(array("Mensaje" => "Datos no autorizados"));
            }

            $id_usuario = $_SESSION['id_usuario'];
            $stmt = $conn->prepare("SELECT usuario.id_usuario, usuario.nombre,usuario.correo,usuario.telefono,usuario.activo,usuario.fecha_registro, usuario.id_rol, roles.tipo AS nombre_rol FROM usuario INNER JOIN roles ON usuario.id_rol = roles.id_rol WHERE usuario.id_usuario = ?");
            $stmt->bind_param("i", $id_usuario);
            $stmt->execute();
            $resultado = $stmt->get_result();
            if ($resultado->num_rows > 0) {
                $usuario = $resultado->fetch_assoc();
                echo json_encode($usuario);
            } else {
                http_response_code(404);
                echo json_encode(["mensaje" => "Usuario no encontrado"]);
            }
            $stmt->close();
            $conn->close();
        } else {
            //Obtener usuarios por id_rol
            //http://localhost/redciudadana/src/api/usuarios_api.php?id_rol=
            $id_rol = intval($_GET["id_rol"] ?? 0);
            $stmt = $conn->prepare("SELECT id_usuario, nombre,correo,telefono,activo,fecha_registro FROM usuario WHERE id_rol = ?");
            $stmt->bind_param("i", $id_rol);
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
        }

        break;
    case 'PATCH':
        //habilitar/deshabilitar una cuenta de un ciudadano (admin)
        if (isset($_GET['id_usuario'])) {
            $id_usuario = intval($_GET['id_usuario']);
            $data = json_decode(file_get_contents("php://input"), true);
            $activo = intval($data['activo'] ?? 0);

            if (!empty($id_usuario)) {
                $stmt = $conn->prepare("UPDATE usuario SET activo = COALESCE(NULLIF(?, ''), activo) WHERE id_usuario = ?");
                $stmt->bind_param("ii", $activo, $id_usuario);
                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array("mensaje" => "Estado del usuario cambiado exitosamente"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("mensaje" => "Error al actualizar la cuenta del usuario " . $stmt->error));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("mensaje" => "El estado de la cuenta usuario es necesario"));
            }
        }
        //modificar celular y correo de un usuario
        if (isset($_GET['id_usuario'])) {
            if (!isset($_SESSION['id_usuario'])) {
                http_response_code(401);
                echo json_encode(array("Mensaje" => "Datos no autorizados"));
            }
            
            $id_usuario = $_SESSION['id_usuario'];

            $data = json_decode(file_get_contents("php://input"), true);
            $correo = trim($data['correo'] ?? "");
            $telefono = trim($data['telefono'] ?? "");

            if (!empty($id_usuario)) {
                $stmt = $conn->prepare("UPDATE usuario SET correo = COALESCE(NULLIF(?, ''), correo), telefono = COALESCE(NULLIF(?, ''), telefono) WHERE id_usuario = ?");
                $stmt->bind_param("ssi", $correo, $telefono, $id_usuario);
                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array("mensaje" => "datos actualizados exitosamente"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("mensaje" => "Error al actualizar los datos" . $stmt->error));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("mensaje" => "El id del usuario es necesario"));
            }
        }
        break;
    default:
        http_response_code(400);
        echo json_encode(array("mensaje" => "Método no válido"));
        break;
}
