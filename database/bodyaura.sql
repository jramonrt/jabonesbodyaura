-- ============================================================
-- Bodyaura — MySQL Database Schema
-- Version: 1.0.0
-- Charset: utf8mb4 (full Unicode + emoji support)
-- ============================================================

-- Create and use database
CREATE DATABASE IF NOT EXISTS bodyaura_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE bodyaura_db;

-- Create dedicated user
CREATE USER IF NOT EXISTS 'bodyaura_user'@'localhost' IDENTIFIED BY 'bodyaura_pass';
GRANT ALL PRIVILEGES ON bodyaura_db.* TO 'bodyaura_user'@'localhost';
FLUSH PRIVILEGES;

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
    id          INT          NOT NULL AUTO_INCREMENT,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    price       DECIMAL(8,2) NOT NULL,
    stock       INT          NOT NULL DEFAULT 0,
    active      TINYINT(1)   NOT NULL DEFAULT 1,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    id             INT             NOT NULL AUTO_INCREMENT,
    order_number   VARCHAR(20)     NOT NULL,
    customer_name  VARCHAR(150)    NOT NULL,
    email          VARCHAR(255)    NOT NULL,
    phone          VARCHAR(15)     NOT NULL,
    address        TEXT            NOT NULL,
    city           VARCHAR(100)    NOT NULL,
    state          VARCHAR(100)    NOT NULL,
    zip_code       VARCHAR(10)     NOT NULL,
    quantity       INT             NOT NULL DEFAULT 1,
    unit_price     DECIMAL(8,2)    NOT NULL,
    total_price    DECIMAL(10,2)   NOT NULL,
    payment_method ENUM('transfer','cash') NOT NULL,
    notes          TEXT,
    status         ENUM('pending','confirmed','shipped','delivered','cancelled')
                                   NOT NULL DEFAULT 'pending',
    created_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE  KEY uq_order_number (order_number),
    INDEX   idx_email           (email),
    INDEX   idx_status          (status),
    INDEX   idx_created_at      (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: contacts
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
    id         INT          NOT NULL AUTO_INCREMENT,
    name       VARCHAR(150) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    message    TEXT         NOT NULL,
    `read`     TINYINT(1)   NOT NULL DEFAULT 0,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_read       (`read`),
    INDEX idx_email      (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED: Initial product
-- ============================================================
INSERT INTO products (name, description, price, stock) VALUES (
    'Jabón Artesanal Bodyaura',
    'Barra premium de cuidado corporal con ingredientes 100% naturales. '
    'Formulada con aceites de oliva y coco, avena coloidal, manteca de karité '
    'y extracto de aloe. Aroma suave de rosas y vainilla. '
    'Sin parabenos, sin sulfatos, apto para piel sensible. 120g.',
    180.00,
    200
);

-- ============================================================
-- SEED: Sample orders (dev only)
-- ============================================================
INSERT INTO orders
    (order_number, customer_name, email, phone, address, city, state, zip_code,
     quantity, unit_price, total_price, payment_method, status)
VALUES
    ('BA-20250601-0001', 'María García López', 'maria@example.com', '5512345678',
     'Calle Insurgentes 100, Col. Condesa', 'Guatemala', 'GT', '06140',
     2, 180.00, 360.00, 'transfer', 'delivered'),

    ('BA-20250605-0002', 'Sofía Ramírez Torres', 'sofia@example.com', '3312345678',
     'Av. Chapultepec 200, Col. Centro', 'Guadalajara', 'Jalisco', '44100',
     1, 180.00, 180.00, 'cash', 'confirmed'),

    ('BA-20250612-0003', 'Ana Lozano Herrera', 'ana@example.com', '8112345678',
     'Calle Morelos 50, Col. Del Valle', 'Monterrey', 'Nuevo León', '64000',
     3, 180.00, 540.00, 'transfer', 'pending');

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

-- Order summary view
CREATE OR REPLACE VIEW v_order_summary AS
SELECT
    o.id,
    o.order_number,
    o.customer_name,
    o.email,
    o.city,
    o.state,
    o.quantity,
    o.total_price,
    o.payment_method,
    o.status,
    o.created_at,
    DATEDIFF(NOW(), o.created_at) AS days_since_order
FROM orders o
ORDER BY o.created_at DESC;

-- Revenue summary view
CREATE OR REPLACE VIEW v_revenue_summary AS
SELECT
    DATE(created_at)    AS order_date,
    COUNT(*)            AS total_orders,
    SUM(quantity)       AS total_units,
    SUM(total_price)    AS total_revenue,
    AVG(total_price)    AS avg_order_value
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS GetOrderByNumber(IN p_order_number VARCHAR(20))
BEGIN
    SELECT
        id, order_number, customer_name, email, phone,
        address, city, state, zip_code, quantity,
        unit_price, total_price, payment_method, notes, status, created_at
    FROM orders
    WHERE order_number = p_order_number
    LIMIT 1;
END //

CREATE PROCEDURE IF NOT EXISTS UpdateOrderStatus(
    IN p_order_number VARCHAR(20),
    IN p_status ENUM('pending','confirmed','shipped','delivered','cancelled')
)
BEGIN
    UPDATE orders
    SET status = p_status, updated_at = NOW()
    WHERE order_number = p_order_number;

    SELECT ROW_COUNT() AS affected;
END //

DELIMITER ;

-- ============================================================
-- Show created objects
-- ============================================================
SHOW TABLES;
