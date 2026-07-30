<?php
session_start();
require_once('../config/connection.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        //AGREGAR ENDPOINT PARA FILTRAR REPORTES POR CIUDADANO
        //endpoint http://localhost/redciudadana/src/api/reportes_api.php?id_usuario=
        if (isset($_GET['id_usuario'])) {
            if (!isset($_SESSION['id_usuario'])) {
                http_response_code(401);
                echo json_encode(array("Mensaje" => "No autorizado"));
            }

            $id_usuario = $_SESSION['id_usuario'];
            $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.ubicacion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte
                WHERE usuario.id_usuario = ? ORDER BY reporte.fecha_creacion DESC");
            $stmt->bind_param("i", $id_usuario);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $reportes = $resultado->fetch_all(MYSQLI_ASSOC);
            echo json_encode($reportes);
            $stmt->close();
            $conn->close();
        } elseif (isset($_GET["buscar"])) {
            //http://localhost/redciudadana/src/api/reportes_api.php?buscar=
            $busquedaReporte = "%" . trim($_GET["buscar"] ?? "") . "%";
            if (!isset($_SESSION['id_usuario'])) {
                http_response_code(401);
                echo json_encode(array("Mensaje" => "No autorizado"));
            }

            $id_usuario = $_SESSION['id_usuario'];
            $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.ubicacion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte
                WHERE usuario.id_usuario = ? AND reporte.titulo LIKE ?");
            $stmt->bind_param("is", $id_usuario, $busquedaReporte);
            $stmt->execute();
            $resultado = $stmt->get_result();
            $reportes = $resultado->fetch_all(MYSQLI_ASSOC);
            echo json_encode($reportes);
            $stmt->close();
            $conn->close();
        } else
        
            //Endpoint para obtener el conteo de reportes por categoría
            if (isset($_GET['groupby']) && $_GET['groupby'] === 'categoria') { 
                $stmt = $conn->prepare("SELECT categoria.id_categoria, categoria.nombre AS nombre_categoria, COUNT(reporte.id_reporte) AS total
        FROM categoria
        LEFT JOIN reporte ON reporte.id_categoria = categoria.id_categoria
        GROUP BY categoria.id_categoria, categoria.nombre");
                $stmt->execute();
                $resultado = $stmt->get_result();
                $conteos = $resultado->fetch_all(MYSQLI_ASSOC);
                echo json_encode($conteos);
                $stmt->close();
                $conn->close();
            }
            else
        
            //Endpoint para obtener el conteo de reportes por estado
            if (isset($_GET['groupby']) && $_GET['groupby'] === 'estado') { 
                $stmt = $conn->prepare("SELECT estado.id_estado, estado.nombre AS nombre_categoria, COUNT(reporte.id_reporte) AS total
        FROM estado
        LEFT JOIN reporte ON reporte.id_estado = estado.id_estado
        GROUP BY estado.id_estado, estado.nombre");
                $stmt->execute();
                $resultado = $stmt->get_result();
                $conteos = $resultado->fetch_all(MYSQLI_ASSOC);
                echo json_encode($conteos);
                $stmt->close();
                $conn->close();
            } //Endpoint para obtener los reportes mas recientes en el dashboard, en base a su fecha de creación y limitando a 3 resultados
            elseif (isset($_GET['recent']) && $_GET['recent'] === 'true') {
                $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.ubicacion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte
                ORDER BY reporte.fecha_creacion DESC LIMIT 3");
                $stmt->execute();
                $resultado = $stmt->get_result();
                $reportesRecientes = $resultado->fetch_all(MYSQLI_ASSOC);
                echo json_encode($reportesRecientes);
                $stmt->close();
                $conn->close();
            }
            
            //filtrar categoria (admin y ciudadano)
            //endpoint http://localhost/redciudadana/src/api/reportes_api.php?id_categoria=2
            elseif (isset($_GET['id_categoria'])) {
                $id_categoria = intval($_GET['id_categoria'] ?? 0);
                $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, reporte.ubicacion, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte
                WHERE reporte.id_categoria = ?");
                $stmt->bind_param("i", $id_categoria);
                $stmt->execute();
                $resultado = $stmt->get_result();
                if ($resultado->num_rows > 0) {
                    $categorias = $resultado->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($categorias);
                } else {
                    echo json_encode([]);
                }
                $stmt->close();
                $conn->close();
            }
            //filtrar por estado (admin y ciudadano)
            //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_estado=2
            elseif (isset($_GET['id_estado'])) {
                $id_estado = intval($_GET['id_estado']);
                $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, reporte.ubicacion, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                INNER JOIN prioridades ON reporte.id_prioridades = prioridades.id_prioridades 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte
                WHERE reporte.id_estado = ?");
                $stmt->bind_param("i", $id_estado);
                $stmt->execute();
                $resultado = $stmt->get_result();
                if ($resultado->num_rows > 0) {
                    $estado = $resultado->fetch_all(MYSQLI_ASSOC);
                    echo json_encode($estado);
                } else {
                    echo json_encode([]);
                }
                $stmt->close();
                $conn->close();
            }
            //filtrar por prioridad (admin)
            //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_prioridad=2
            elseif (isset($_GET['id_prioridad'])) {
                $id_proridad = intval($_GET['id_prioridad']);
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
            //obtener todos los reportes (admin)
            //endpoint: http://localhost/redciudadana/src/api/reportes_api.php
            else {
                $stmt = $conn->prepare("SELECT reporte.id_reporte, reporte.titulo, reporte.descripcion, reporte.ubicacion, reporte.id_prioridades, reporte.id_categoria, reporte.id_estado, categoria.nombre AS nombre_categoria, usuario.nombre AS nombre_ciudadano, estado.nombre AS nombre_estado, reporte.fecha_creacion, evidencias.ruta_archivo 
                FROM reporte 
                INNER JOIN categoria ON reporte.id_categoria = categoria.id_categoria 
                INNER JOIN estado ON reporte.id_estado = estado.id_estado 
                INNER JOIN usuario ON reporte.id_usuario = usuario.id_usuario 
                LEFT JOIN evidencias ON reporte.id_reporte = evidencias.id_reporte");
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
                echo json_encode(array("mensaje" => "Reporte creado exitosamente", "id_reporte" => $stmt->insert_id));
            } else {
                http_response_code(500);
                echo json_encode(array("mensaje" => "Error al crear el reporte " . $stmt->error));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("mensaje" => "Todos los datos son obligatorios"));
        }
        break;
    case 'PATCH':
        //cambiar estado y prioridad del reporte
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_reporte=2
        if (isset($_GET['id_reporte'])) {
            $id_reporte = intval($_GET['id_reporte']);
            $data = json_decode(file_get_contents("php://input"), true);
            $id_estado = intval($data['id_estado'] ?? 0);
            $id_prioridades = intval($data['id_prioridades'] ?? 0);
            if (!empty($id_estado)) {
                $stmt = $conn->prepare("UPDATE reporte SET id_estado = COALESCE(NULLIF(?, ''), id_estado) , id_prioridades = COALESCE(NULLIF(?, ''), id_prioridades) WHERE id_reporte = ?");
                $stmt->bind_param("ii", $id_estado, $id_prioridades, $id_reporte);
                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array("mensaje" => "Estado cambiado exitosamente"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("mensaje" => "Error al actualizar el estado del reporte " . $stmt->error));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("mensaje" => "El id del estado del reporte es necesario"));
            }
        }
        break;
    case 'DELETE':
        //eliminar reporte (admin)
        //endpoint: http://localhost/redciudadana/src/api/reportes_api.php?id_reporte=2
        $id_reporte = $_GET['id_reporte'] ?? null;

        if (!empty($id_reporte)) {
            $stmt = $conn->prepare("DELETE FROM reporte WHERE id_reporte = ?");
            $stmt->bind_param("i", $id_reporte);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["mensaje" => "Reporte eliminado exitosamente"]);
            } else {
                http_response_code(500);
                echo json_encode(["mensaje" => "Error al eliminar reporte " . $stmt->error]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensaje" => "No se recibió el id del reporte"]);
        }
        break;
    default:
        http_response_code(400);
        echo json_encode(array("mensaje" => "Método no válido"));
        break;
}
