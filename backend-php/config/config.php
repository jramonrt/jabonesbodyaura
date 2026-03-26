<?php
// ============================================================
// Bodyaura PHP Backend — Configuration
// ============================================================

define('DB_HOST',     getenv('DB_HOST')     ?: 'localhost');
define('DB_PORT',     getenv('DB_PORT')     ?: '3306');
define('DB_NAME',     getenv('DB_NAME')     ?: 'bodyaura_db');
define('DB_USER',     getenv('DB_USER')     ?: 'bodyaura_user');
define('DB_PASS',     getenv('DB_PASS')     ?: 'bodyaura_pass');
define('DB_CHARSET',  'utf8mb4');

define('API_SECRET',  getenv('PHP_API_SECRET') ?: 'bodyaura-php-secret-2025');
define('PRODUCT_PRICE', 180.00);

define('SMTP_HOST',   getenv('SMTP_HOST')   ?: 'smtp.gmail.com');
define('SMTP_PORT',   getenv('SMTP_PORT')   ?: 587);
define('SMTP_USER',   getenv('SMTP_USER')   ?: 'jabonesbodyaura@gmail.com');
define('SMTP_PASS',   getenv('SMTP_PASS')   ?: '');

define('CORS_ORIGIN', getenv('CORS_ORIGIN') ?: 'http://localhost:3000');
