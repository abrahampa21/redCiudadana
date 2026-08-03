<?php
session_start();

$toast = false;
$toast_type = "";
$toast_message = "";

function validar_contraseña($contraseña)
{
	// Mínimo 8 caracteres
	if (strlen($contraseña) < 8) {
		return false;
	}

	// Al menos una letra
	if (!preg_match('/[A-Za-z]/', $contraseña)) {
		return false;
	}

	// Al menos un carácter especial
	if (!preg_match('/[!@#$%^&*()_\-=\[\]{};\'":\\|,.<>\/\?]/', $contraseña)) {
		return false;
	}

	return true;
}


//Formulario Registro
if (isset($_POST["btn-registro"])) {
	$nombre = trim(htmlspecialchars($_POST['name']));
	$correo = strtolower(trim(htmlspecialchars($_POST['email'])));
	$telefono = trim(htmlspecialchars($_POST['cellphone']));
	$pass = trim(htmlspecialchars($_POST['password']));

	if (!validar_contraseña($pass)) {
		$toast = true;
		$toast_type = "error";
		$toast_message = "Contraseña no válida, debe contener mínimo 8 caracteres, 1 caracter especial y 1 letra";
	} else {
		$securePass = sha1($pass);

		// validación de datos repetidos
		$validar = $conn->prepare("SELECT correo, telefono FROM usuario WHERE correo = ? OR telefono = ?");
		$validar->bind_param("ss", $correo, $telefono);
		$validar->execute();
		$resultado_verificar = $validar->get_result();

		if ($resultado_verificar && $resultado_verificar->num_rows > 0) {
			$toast = true;
			$toast_message = "Correo o teléfono ya registrado";
		} else { //consulta de inserción
			$registro = $conn->prepare("INSERT INTO usuario(nombre,correo,password,telefono,id_rol) VALUES (?,?,?,?,1)");
			$registro->bind_param("ssss", $nombre, $correo, $securePass, $telefono);

			if ($registro->execute()) {
				$toast = true;
				$toast_type = "success";
				$toast_message = "Usuario registrado correctamente";
			} else {
				$toast = true;
				$toast_type = "error";
				$toast_message = "Error al registrar datos";
			}
			$registro->close();
		}
		$validar->close();
	}
}

//Recuperar contraseña
if (isset($_POST["recover-btn"])) {
	$correo = trim(htmlspecialchars($_POST['email']));
	$nueva_contraseña = trim(htmlspecialchars($_POST['password']));

	if (!validar_contraseña($nueva_contraseña)) {
		$toast = true;
		$toast_type = "error";
		$toast_message = "Contraseña no válida, debe contener mínimo 8 caracteres, 1 caracter especial y 1 letra";
	} else {
		// Verificar si el correo existe primero
		$verificarCorreo = $conn->prepare("SELECT id_usuario FROM usuario WHERE correo = ? AND id_rol = 1 LIMIT 1");
		$verificarCorreo->bind_param("s", $correo);
		$verificarCorreo->execute();
		$resCorreo = $verificarCorreo->get_result();

		if ($resCorreo->num_rows === 0) {
			$toast = true;
			$toast_type = "error";
			$toast_message = "No existe una cuenta con ese correo";
		} else {
			$securePass = sha1($nueva_contraseña);
			$update = $conn->prepare("UPDATE usuario SET password = ? WHERE correo = ? AND id_rol = 1");
			$update->bind_param("ss", $securePass, $correo);

			if ($update->execute()) {
				$toast = true;
				$toast_type = "success";
				$toast_message = "Contraseña actualizada correctamente";
			} else {
				$toast = true;
				$toast_type = "error";
				$toast_message = "Error al actualizar la contraseña";
			}
			$update->close();
		}
		$verificarCorreo->close();
	}
}

//Formulario Login
if (isset($_POST["login-button"])) {
	$correo = trim(htmlspecialchars($_POST['email']));
	$pass = trim(htmlspecialchars($_POST['password']));
	$passSec = sha1($pass);

	// 1. Verificar si el correo existe
	$loginCorreo = $conn->prepare("SELECT id_usuario, nombre, activo, password FROM usuario WHERE correo = ? AND id_rol = 1 LIMIT 1");
	$loginCorreo->bind_param("s", $correo);
	$loginCorreo->execute();
	$resCorreo = $loginCorreo->get_result();

	if ($resCorreo->num_rows === 0) {
		$toast = true;
		$toast_type = "error";
		$toast_message = "No existe una cuenta para este correo";
	} else {
		$usuario = $resCorreo->fetch_assoc();

		// 2. Verificar si la contraseña es correcta
		if ($usuario['password'] !== $passSec) {
			$toast = true;
			$toast_type = "error";
			$toast_message = "Contraseña incorrecta";
		} else {
			$_SESSION['id_usuario'] = $usuario['id_usuario'];
			$_SESSION['nombre'] = $usuario['nombre'];
            $_SESSION['activo'] = $usuario['activo'];
			header("Location: panelCiudadano/dashboard.php");
			exit();
		}
	}
	$loginCorreo->close();
}
$conn->close();