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
    $id_eleve = $data->id_eleve ?? null;
    $contenu = $data->contenu ?? '';
    $etoiles = $data->etoiles ?? 5;

    if (!$id_eleve || empty($contenu)) {
        echo json_encode(["success" => false, "error" => "Champs manquants."]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO avis (id_eleve, contenu, nb_etoiles) VALUES (?, ?, ?)");
    $success = $stmt->execute([$id_eleve, $contenu, $etoiles]);

    echo json_encode(["success" => $success]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
