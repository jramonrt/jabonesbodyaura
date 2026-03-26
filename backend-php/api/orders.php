<?php
// ============================================================
// Bodyaura PHP Backend — Orders API
// POST /api/orders.php  → Create order
// GET  /api/orders.php  → List orders
// ============================================================

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/helpers.php';

setCorsHeaders();
handlePreflight();

$method = $_SERVER['REQUEST_METHOD'];

// ---- POST: Create Order ----
if ($method === 'POST') {
    $data = getRequestBody();

    // Validate required fields
    $required = ['customerName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'quantity', 'paymentMethod'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            jsonResponse(false, null, "El campo '{$field}' es requerido", 400);
        }
    }

    $name       = sanitize($data['customerName']);
    $email      = sanitize($data['email']);
    $phone      = sanitize($data['phone']);
    $address    = sanitize($data['address']);
    $city       = sanitize($data['city']);
    $state      = sanitize($data['state']);
    $zipCode    = sanitize($data['zipCode']);
    $quantity   = (int) $data['quantity'];
    $payment    = sanitize($data['paymentMethod']);
    $notes      = isset($data['notes']) ? sanitize($data['notes']) : null;

    // Validations
    if (!validateEmail($email)) jsonResponse(false, null, 'Email inválido', 400);
    if (!validatePhone($phone)) jsonResponse(false, null, 'Teléfono inválido (10 dígitos)', 400);
    if ($quantity < 1 || $quantity > 99) jsonResponse(false, null, 'Cantidad inválida', 400);
    if (!in_array($payment, ['TRANSFER', 'CASH', 'transfer', 'cash'])) {
        jsonResponse(false, null, 'Método de pago inválido', 400);
    }

    $orderNumber = $data['orderNumber'] ?? generateOrderNumber();
    $unitPrice   = PRODUCT_PRICE;
    $totalPrice  = $unitPrice * $quantity;

    try {
        $db = Database::getConnection();

        // Check if order number already exists (idempotency)
        $check = $db->prepare('SELECT id FROM orders WHERE order_number = ?');
        $check->execute([$orderNumber]);
        if ($check->fetch()) {
            // Return existing order confirmation
            jsonResponse(true, [
                'orderNumber'       => $orderNumber,
                'customerName'      => $name,
                'totalPrice'        => $totalPrice,
                'quantity'          => $quantity,
                'estimatedDelivery' => date('l, j \d\e F', strtotime('+4 days')),
            ]);
        }

        $stmt = $db->prepare("
            INSERT INTO orders
                (order_number, customer_name, email, phone, address, city, state, zip_code,
                 quantity, unit_price, total_price, payment_method, notes, status, created_at, updated_at)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())
        ");

        $stmt->execute([
            $orderNumber, $name, $email, $phone, $address,
            $city, $state, $zipCode, $quantity, $unitPrice,
            $totalPrice, strtolower($payment), $notes,
        ]);

        jsonResponse(true, [
            'orderNumber'       => $orderNumber,
            'customerName'      => $name,
            'totalPrice'        => $totalPrice,
            'quantity'          => $quantity,
            'estimatedDelivery' => date('l, j \d\e F', strtotime('+4 days')),
        ], null, 201);

    } catch (PDOException $e) {
        error_log('[Bodyaura PHP] DB error: ' . $e->getMessage());
        jsonResponse(false, null, 'Error al procesar el pedido', 500);
    }
}

// ---- GET: List Orders ----
if ($method === 'GET') {
    try {
        $db    = Database::getConnection();
        $page  = max(1, (int) ($_GET['page'] ?? 1));
        $limit = min(50, max(1, (int) ($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;

        $stmt = $db->prepare('
            SELECT id, order_number, customer_name, email, phone, city, state,
                   quantity, total_price, payment_method, status, created_at
            FROM orders
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        ');
        $stmt->execute([$limit, $offset]);
        $orders = $stmt->fetchAll();

        $count = $db->query('SELECT COUNT(*) FROM orders')->fetchColumn();

        jsonResponse(true, [
            'orders' => $orders,
            'total'  => (int) $count,
            'page'   => $page,
            'limit'  => $limit,
        ]);

    } catch (PDOException $e) {
        jsonResponse(false, null, 'Error al obtener pedidos', 500);
    }
}

jsonResponse(false, null, 'Método no permitido', 405);
