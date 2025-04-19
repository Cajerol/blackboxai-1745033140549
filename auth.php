<?php
// auth/auth.php

// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Iniciar sesión
session_start();

// Verificar la ruta correcta al archivo de conexión
if (file_exists('../connection/connection.php')) {
    // Incluir el archivo de conexión
    require_once '../connection/connection.php';
} else {
    die("Error: No se puede encontrar el archivo de conexión.");
}

// Función para autenticar usuario
function autenticarUsuario($usuario, $contraseña) {
    // Crear instancia de la base de datos
    $database = new Database();
    $conn = $database->connect();
    
    // Variable para almacenar el resultado de la autenticación
    $resultado = array(
        'exito' => false,
        'mensaje' => '',
        'usuario' => null
    );
    
    try {
        // Verificar si la conexión fue exitosa
        if (!$conn) {
            throw new PDOException("La conexión a la base de datos falló");
        }
        
        // Preparar consulta
        $stmt = $conn->prepare("SELECT IdUsuario, Nombre, Usuario, Contraseña, IdRol FROM usuarios WHERE Usuario = :usuario LIMIT 1");
        $stmt->bindParam(':usuario', $usuario);
        $stmt->execute();
        
        // Verificar si el usuario existe
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verificar si la contraseña coincide (comparación directa en este caso)
            if ($contraseña === $row['Contraseña']) {
                // Autenticación exitosa
                $resultado['exito'] = true;
                $resultado['mensaje'] = 'Inicio de sesión exitoso';
                
                // Guardar información del usuario sin la contraseña
                $usuarioInfo = array(
                    'id' => $row['IdUsuario'],
                    'nombre' => $row['Nombre'],
                    'usuario' => $row['Usuario'],
                    'rol' => $row['IdRol']
                );
                
                $resultado['usuario'] = $usuarioInfo;
                
                // Guardar datos en la sesión para mantener al usuario autenticado
                $_SESSION['usuario_id'] = $row['IdUsuario'];
                $_SESSION['usuario_nombre'] = $row['Nombre'];
                $_SESSION['usuario_rol'] = $row['IdRol'];
                $_SESSION['autenticado'] = true;
            } else {
                $resultado['mensaje'] = 'Contraseña incorrecta';
            }
        } else {
            $resultado['mensaje'] = 'Usuario no encontrado';
        }
    } catch(PDOException $e) {
        $resultado['mensaje'] = 'Error en la base de datos: ' . $e->getMessage();
    }
    
    // Cerrar conexión
    $database->close();
    
    return $resultado;
}

// Función para verificar si un usuario está autenticado
function estaAutenticado() {
    return isset($_SESSION['autenticado']) && $_SESSION['autenticado'] === true;
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar todas las variables de sesión
    $_SESSION = array();
    
    // Destruir la sesión
    session_destroy();
    
    // Redireccionar al login
    header('Location: ../login.html');
    exit;
}

// Procesar solicitud de autenticación si se reciben datos por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si es una solicitud de AJAX
    $esAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    
    // Obtener datos del formulario
    $usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
    $contraseña = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';
    
    // Validar que los campos no estén vacíos
    if (empty($usuario) || empty($contraseña)) {
        $respuesta = array(
            'exito' => false,
            'mensaje' => 'Por favor, complete todos los campos'
        );
    } else {
        // Intentar autenticar al usuario
        $respuesta = autenticarUsuario($usuario, $contraseña);
    }
    
    // Si es una solicitud AJAX, devolver JSON
    if ($esAjax) {
        header('Content-Type: application/json');
        echo json_encode($respuesta);
        exit;
    } 
    // Si no es AJAX y la autenticación fue exitosa, redirigir
    else if ($respuesta['exito']) {
        header('Location: ../views/home.html');
        exit;
    } 
    // Si no es AJAX y hubo error, redirigir al login con mensaje de error
    else {
        $_SESSION['error_login'] = $respuesta['mensaje'];
        header('Location: ../login.html?error=' . urlencode($respuesta['mensaje']));
        exit;
    }
}
?>