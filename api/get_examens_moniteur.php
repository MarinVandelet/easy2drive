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
    $id_moniteur = $data->id_moniteur ?? null;

    if (!$id_moniteur) {
        echo json_encode([]);
        exit;
    }

    // Examens à venir
    $stmt1 = $pdo->prepare("
        SELECT ea.*, u.nom, u.prenom
        FROM examensavenir ea
        JOIN users u ON ea.id_eleve = u.id
        WHERE ea.id_moniteur = ?
    ");
    $stmt1->execute([$id_moniteur]);
    $avenir = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    // Examens passés
    $stmt2 = $pdo->prepare("
        SELECT ep.*, u.nom, u.prenom
        FROM examen_permis ep
        JOIN users u ON ep.id_eleve = u.id
        WHERE ep.id_moniteur = ?
    ");
    $stmt2->execute([$id_moniteur]);
    $passes = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "avenir" => $avenir,
        "passes" => $passes
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
