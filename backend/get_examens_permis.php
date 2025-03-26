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

    if (!$id_eleve) {
        echo json_encode([]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM examen_permis WHERE id_eleve = ? AND date_passage < NOW()");
    $stmt->execute([$id_eleve]);
    $examens = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($examens);
} catch (PDOException $e) {
    echo json_encode([]);
}
