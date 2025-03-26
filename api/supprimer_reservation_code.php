<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Connexion à la base de données
$host = 'mysql-forart.alwaysdata.net';
$dbname = 'forart_db';
$username = 'forart';
$password = '1Motdepasse123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id ?? null;

    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM coderouteavenir WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "ID manquant"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
