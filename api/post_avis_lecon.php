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
    $id_lecon = $data->id_lecon ?? null;
    $avis = trim($data->avis ?? '');

    if (!$id_lecon) {
        echo json_encode(["success" => false, "message" => "ID manquant."]);
        exit;
    }

    if ($avis === '') {
        $stmt = $pdo->prepare("UPDATE leconconduitepasses SET avis = NULL WHERE id = ?");
        $stmt->execute([$id_lecon]);
        echo json_encode(["success" => true, "message" => "Avis supprimé."]);
    } else {
        $stmt = $pdo->prepare("UPDATE leconconduitepasses SET avis = ? WHERE id = ?");
        $stmt->execute([$avis, $id_lecon]);
        echo json_encode(["success" => true, "message" => "Avis enregistré."]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
