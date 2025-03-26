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
    $date_passage = $data->date_passage ?? null;
    $creneau = $data->creneau ?? null;
    $centre = $data->centre ?? null;

    if ($id_eleve && $date_passage && $creneau && $centre) {
        $stmt = $pdo->prepare("INSERT INTO coderouteavenir (id_eleve, date_passage, creneau, centre) VALUES (?, ?, ?, ?)");
        $stmt->execute([$id_eleve, $date_passage, $creneau, $centre]);
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Données manquantes"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
