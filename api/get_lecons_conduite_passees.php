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
    $id_eleve = $data['id_eleve'] ?? null;

    if (!$id_eleve) {
        echo json_encode(["success" => false, "message" => "ID élève manquant"]);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT l.*, u.nom AS nom_moniteur, u.prenom AS prenom_moniteur
        FROM leconconduitepasses l
        JOIN users u ON l.id_moniteur = u.id
        WHERE l.id_eleve = ?
        ORDER BY l.date_lecon DESC
    ");
    $stmt->execute([$id_eleve]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>