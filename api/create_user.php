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
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        isset($data['prenom'], $data['nom'], $data['email'], $data['password'], $data['role'], $data['date_naissance'])
    ) {
        $stmt = $pdo->prepare("INSERT INTO users (prenom, nom, email, password, role, date_naissance) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['prenom'],
            $data['nom'],
            $data['email'],
            $data['password'],
            $data['role'],
            $data['date_naissance']
        ]);
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Champs manquants"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
