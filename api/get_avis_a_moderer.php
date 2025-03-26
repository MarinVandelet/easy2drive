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

    $stmt = $pdo->query("
        SELECT avis.*, users.nom, users.prenom
        FROM avis
        JOIN users ON avis.id_eleve = users.id
        WHERE est_modere = 0
        ORDER BY date_depot DESC
    ");

    $avis = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($avis);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
