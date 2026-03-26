<?php
// ============================================================
// Bodyaura PHP Backend — Database (PDO)
// ============================================================

require_once __DIR__ . '/../config/config.php';

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
            );
            try {
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
            } catch (PDOException $e) {
                http_response_code(503);
                echo json_encode(['success' => false, 'error' => 'Database connection failed']);
                exit;
            }
        }
        return self::$instance;
    }
}
