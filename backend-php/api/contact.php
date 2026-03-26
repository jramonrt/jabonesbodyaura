<?php
// ============================================================
// Bodyaura PHP Backend — Contact API
// POST /api/contact.php
// ============================================================

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, null, 'Método no permitido', 405);
}

$data = getRequestBody();

// Validate
foreach (['name', 'email', 'message'] as $field) {
    if (empty($data[$field])) {
        jsonResponse(false, null, "El campo '{$field}' es requerido", 400);
    }
}

$name    = sanitize($data['name']);
$email   = sanitize($data['email']);
$message = sanitize($data['message']);

if (!validateEmail($email)) jsonResponse(false, null, 'Email inválido', 400);
if (strlen($message) < 10) jsonResponse(false, null, 'El mensaje debe tener al menos 10 caracteres', 400);

try {
    $db = Database::getConnection();
    $stmt = $db->prepare('INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())');
    $stmt->execute([$name, $email, $message]);

    jsonResponse(true, ['message' => 'Mensaje recibido correctamente'], null, 201);
} catch (PDOException $e) {
    error_log('[Bodyaura PHP Contact] ' . $e->getMessage());
    jsonResponse(false, null, 'Error al guardar el mensaje', 500);
}
