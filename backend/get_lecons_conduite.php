<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$host = 'mysql-forart.alwaysdata.net';
$dbname = 'forart_db';
$username = 'forart';
$password = '1Motdepasse123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    $id_eleve = $data['id_eleve'] ?? null;
    $semaine_debut = $data['semaine_debut'] ?? null;

    if (!$id_eleve || !$semaine_debut) {
        echo json_encode([]);
        exit;
    }

    $dateStart = new DateTime($semaine_debut);
    $dateEnd = clone $dateStart;
    $dateEnd->modify('+6 days');

    $stmt = $pdo->prepare("
        SELECT l.*, u.prenom AS prenom_moniteur, u.nom AS nom_moniteur
        FROM leconconduite l
        JOIN users u ON l.id_moniteur = u.id
        WHERE l.id_eleve = ? AND l.date_lecon BETWEEN ? AND ?
        ORDER BY l.date_lecon, l.creneau
    ");
    $stmt->execute([$id_eleve, $dateStart->format('Y-m-d'), $dateEnd->format('Y-m-d')]);
    $lecons = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($lecons);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
