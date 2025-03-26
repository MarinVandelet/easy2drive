<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=utf-8");

// Connexion à la base de données
$host = 'mysql-forart.alwaysdata.net';
$dbname = 'forart_db';
$username = 'forart';
$password = '1Motdepasse123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur de connexion à la base de données",
        "error" => $e->getMessage()
    ]);
    exit;
}

$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

$sql = "
    SELECT a.contenu, a.nb_etoiles, a.date_publication, u.prenom, u.nom
    FROM avis a
    JOIN users u ON a.id_eleve = u.id
    WHERE a.est_modere = 1 AND a.date_publication IS NOT NULL
    ORDER BY a.date_publication DESC
    LIMIT 3 OFFSET $offset
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $avis = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($avis);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'exécution de la requête",
        "error" => $e->getMessage()
    ]);
}
?>
