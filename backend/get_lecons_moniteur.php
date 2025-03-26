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

    // Leçons à venir 
    $stmt1 = $pdo->prepare("
        SELECT l.*, u.nom, u.prenom
        FROM leconconduite l
        JOIN users u ON l.id_eleve = u.id
        WHERE l.id_moniteur = ? AND l.date_lecon >= CURDATE()
    ");
    $stmt1->execute([$id_moniteur]);
    $avenir = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    // Leçons passées
    $stmt2 = $pdo->prepare("
        SELECT lp.*, u.nom, u.prenom
        FROM leconconduitepasses lp
        JOIN users u ON lp.id_eleve = u.id
        WHERE lp.id_moniteur = ? AND lp.date_lecon < NOW()
    ");
    $stmt2->execute([$id_moniteur]);
    $passees = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "avenir" => $avenir,
        "passees" => $passees
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
