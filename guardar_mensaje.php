<?php
$host = "localhost";
$user = "root"; 
$pass = "";     
$db   = "proyecto_web"; 

// Conexión
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$nombre  = $_POST['nombre'] ?? '';
$email   = $_POST['email'] ?? '';
$tema    = $_POST['tema'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';

$stmt = $conn->prepare("INSERT INTO mensajes (nombre, email, tema, mensaje) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $email, $tema, $mensaje);

if ($stmt->execute()) {
    echo "Mensaje guardado exitosamente en la base de datos.";
} else {
    echo "Error al guardar: " . $conn->error;
}

$stmt->close();
$conn->close();
?>