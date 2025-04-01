<?php
session_start(); // Iniciar sesión

// Incluir el archivo de conexión a la base de datos
require_once 'db.php';

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario
    $usuarioCorreo = $_POST['usuario']; // Puede ser un usuario o un correo
    $password = $_POST['password'];

    // Preparar la consulta para buscar por usuario o correo
    $stmt = $pdo->prepare("SELECT * FROM usuario WHERE usuario = :usuarioCorreo OR correo = :usuarioCorreo");
    $stmt->bindParam(':usuarioCorreo', $usuarioCorreo);
    $stmt->execute();

    // Verificar si el usuario existe
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Verificar la contraseña usando password_verify
        if (password_verify($password, $user['password'])) {
            // Contraseña correcta, iniciar sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['usuario'] = $user['usuario'];
            $_SESSION['correo'] = $user['correo']; // Puedes almacenar el correo también si es necesario
            header("Location: dashboard.php"); // Redirigir a la página protegida
            exit();
        } else {
            // Contraseña incorrecta
            echo "<p>Contraseña incorrecta.</p>";
        }
    } else {
        // Usuario o correo no encontrado
        echo "<p>El usuario o correo no existe.</p>";
    }
}
?>

