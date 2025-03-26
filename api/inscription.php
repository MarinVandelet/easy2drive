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
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}

// Récupération des données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérification des champs
if (
    empty($data['prenom']) ||
    empty($data['nom']) ||
    empty($data['email']) ||
    empty($data['password'])
) {
    echo json_encode(["success" => false, "message" => "Tous les champs sont obligatoires."]);
    exit;
}

$prenom = $data['prenom'];
$nom = $data['nom'];
$email = $data['email'];
$password = $data['password'];
$role = 'eleve'; 

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé."]);
    exit;
}

// créer l'utilisateur
$stmt = $pdo->prepare("INSERT INTO users (prenom, nom, email, password, role) VALUES (?, ?, ?, ?, ?)");
$success = $stmt->execute([$prenom, $nom, $email, $password, $role]);

if ($success) {
    echo json_encode(["success" => true, "message" => "Inscription réussie ! Vous pouvez maintenant vous connecter."]);
} else {
    echo json_encode(["success" => false, "message" => "Une erreur est survenue lors de l'inscription."]);
}
?>
