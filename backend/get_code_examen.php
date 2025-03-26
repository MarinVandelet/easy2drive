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
} catch (PDOException $e) {
    echo json_encode(["error" => "Connexion échouée"]);
    exit;
}

$id_eleve = isset($_GET['id_eleve']) ? intval($_GET['id_eleve']) : 0;
if ($id_eleve === 0) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM coderoute WHERE id_eleve = ?");
$stmt->execute([$id_eleve]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
?>