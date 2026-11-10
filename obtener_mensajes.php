<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "proyecto_web"; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

$sql = "SELECT nombre, email, tema, mensaje, fecha FROM mensajes ORDER BY fecha DESC";
$resultado = $conn->query($sql);

if (!$resultado) {
    die(json_encode(["error" => "Error en la consulta SQL: " . $conn->error]));
}

$mensajes = array();

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $mensajes[] = $fila;
    }
}

header('Content-Type: application/json');
echo json_encode($mensajes);

$conn->close();
?>