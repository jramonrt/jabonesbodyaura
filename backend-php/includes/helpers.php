<?php
// ============================================================
// Bodyaura PHP Backend — Helpers
// ============================================================

function setCorsHeaders(): void {
    $origin = CORS_ORIGIN;
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Api-Key');
    header('Content-Type: application/json; charset=utf-8');
}

function handlePreflight(): void {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function jsonResponse(bool $success, mixed $data = null, ?string $error = null, int $code = 200): void {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'data'    => $data,
        'error'   => $error,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

function sanitize(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

function validateEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function validatePhone(string $phone): bool {
    return (bool) preg_match('/^\d{10}$/', $phone);
}

function generateOrderNumber(): string {
    $date = date('Ymd');
    $rand = str_pad((string) random_int(1000, 9999), 4, '0', STR_PAD_LEFT);
    return "BA-{$date}-{$rand}";
}

function getRequestBody(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}
