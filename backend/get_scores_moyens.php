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
    echo json_encode(["error" => "Erreur de connexion à la base de données"]);
    exit;
}

$id_eleve = isset($_GET['id_eleve']) ? intval($_GET['id_eleve']) : 0;

if ($id_eleve === 0) {
    echo json_encode(["error" => "ID élève manquant"]);
    exit;
}

// Moyenne des tests
$reqTests = $pdo->prepare("SELECT AVG(score) as moyenne FROM tests WHERE id_eleve = ?");
$reqTests->execute([$id_eleve]);
$moyenne_tests = floatval($reqTests->fetch(PDO::FETCH_ASSOC)['moyenne']);

// Moyenne des examens blancs
$reqBlancs = $pdo->prepare("SELECT AVG(score) as moyenne FROM codeblancs WHERE id_eleve = ?");
$reqBlancs->execute([$id_eleve]);
$moyenne_codeblancs = floatval($reqBlancs->fetch(PDO::FETCH_ASSOC)['moyenne']);

// Retour JSON
echo json_encode([
    "moyenne_tests" => $moyenne_tests,
    "moyenne_codeblancs" => $moyenne_codeblancs
]);
