# Bodyaura — Sistema Web

> *demo de presentacion unicamente.*

Web para la marca de jabones artesanales **Bodyaura**. Página corporativa con flujo de compra.

---

## Arquitectura

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENTE                               │
└───────────────────────┬──────────────────────────────────┘
                        │  HTTP/HTTPS
┌───────────────────────▼──────────────────────────────────┐
│            Next.js (React y TypeScript)                  │
│                                                          │
│  • Pages: /index, /nosotros, /filosofia, /producto,      │
│           /tienda, /contacto                             │
│  • API:   POST /api/orders  POST /api/contact            │
└──────────┬──────────────────────┬────────────────────────┘
           │                      │
    ┌──────▼──────┐        ┌──────▼──────┐
    │   .NET      │        │    PHP      │
    │             │        │             │
    │             │        │             │
    │             │        │             │
    │             │        │             │
    └──────┬──────┘        └──────┬──────┘
           │                      │
    ┌──────▼──────────────────────▼──────┐
    │           MySQL                    │
    │         bodyaura_db                │
    │  tables: orders, contacts,         │
    │          products                  │
    └────────────────────────────────────┘
```

---

## Estructura

```
bodyaura/
├── frontend/                  # Next.js y React y TypeScript
│   ├── src/
│   │   ├── app/               # Pages & API routes (App Router)
│   │   │   ├── page.tsx           /
│   │   │   ├── nosotros/          /nosotros
│   │   │   ├── filosofia/         /filosofia
│   │   │   ├── producto/          /producto
│   │   │   ├── tienda/            /tienda
│   │   │   ├── contacto/          /contacto
│   │   │   └── api/
│   │   │       ├── orders/        POST/GET /api/orders
│   │   │       ├── contact/       POST /api/contact
│   │   │       └── product/       GET /api/product
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   ├── sections/      # HeroSection, BenefitsSection...
│   │   │   ├── shop/          # OrderForm, ContactForm
│   │   │   └── ui/            # SoapVisual, ScrollReveal
│   │   ├── lib/               # prisma.ts, utils.ts, validations.ts
│   │   ├── types/             # TypeScript interfaces
│   │   └── styles/            # globals.css (Tailwind)
│   ├── prisma/
│   │   └── schema.prisma      # DB schema (Prisma ORM)
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── Dockerfile
│
├── backend-dotnet/            # .NET 8 Order Microservice
│   ├── Controllers/           # OrdersController.cs
│   ├── Models/                # Order.cs 
│   ├── DTOs/                  # Request/Response DTOs
│   ├── Services/              # OrderService, EmailService
│   ├── Data/                  # BodyauraDbContext.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── Dockerfile
│
├── backend-php/               # PHP 8 Backend
│   ├── api/
│   │   ├── orders.php         # GET/POST /api/orders.php
│   │   └── contact.php        # POST /api/contact.php
│   ├── config/config.php
│   ├── includes/              # db.php, helpers.php
│   └── Dockerfile
│
├── database/
│   └── bodyaura.sql           # Schema + seed data
│
└── docker-compose.yml         # Full stack orchestration
```

---

## Inicio 

### Opción Docker Compose

```bash
# Clonar y configurar
git clone <el link del repo>
cd bodyaura

# Levantar todos los servicios
docker-compose up -d

```

Servicios disponibles:
| Servicio | URL |
|----------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| API (Next.js) | http://localhost:3000/api |
| .NET Microservice | http://localhost:5000 |
| .NET Swagger | http://localhost:5000/swagger |
| PHP Backend | http://localhost:8080 |
| MySQL | localhost:3306 |

---

### Opción Desarrollo local - XAMPP

#### 1. MySQL
```bash
mysql -u root -p < database/bodyaura.sql
```

#### 2. Next.js Frontend
```bash
cd frontend
cp .env.example .env.local
# Editar .env.local con credenciales

npm install
npx prisma generate
npx prisma db push   # schema con MySQL

npm run dev          # http://localhost:3000
```

#### 3. .NET Microservice
```bash
cd backend-dotnet
dotnet restore
dotnet run           # http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

#### 4. PHP Backend
```bash
cd backend-php
php -S localhost:8080  # http://localhost:8080
```

---

## API Reference

### Next.js API Routes

#### `POST /api/orders`
Crear un nuevo pedido.

```json
{
  "customerName": "María García",
  "email": "maria@ejemplo.com",
  "phone": "5512345678",
  "address": "Calle Insurgentes 100",
  "city": "Ciudad de Guatemala",
  "state": "GTM",
  "zipCode": "06140",
  "quantity": 2,
  "paymentMethod": "TRANSFER",
  "notes": "Sin notas"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "orderNumber": "BA-20250612-4821",
    "customerName": "María García",
    "totalPrice": 360,
    "quantity": 2,
    "estimatedDelivery": "lunes, 16 de junio"
  }
}
```

#### `POST /api/contact`
Enviar mensaje de contacto.

#### `GET /api/product`
Obtener datos del producto activo.

---

### .NET Microservice

Base URL: `http://localhost:5000/api`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/orders` | Crear pedido |
| GET | `/orders` | Listar pedidos |
| GET | `/orders/{orderNumber}` | Obtener por número |
| PATCH | `/orders/{id}/status` | Actualizar estado |
| GET | `/health` | Health check |

Requiere header: `X-Api-Key: bodyaura-dotnet-secret-key-2025`

---

### PHP Backend

Base URL: `http://localhost:8080/api`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/orders.php` | Crear pedido |
| GET | `/orders.php` | Listar pedidos |
| POST | `/contact.php` | Enviar mensaje |

---

##  Base de Datos

**Esquema:** `bodyaura_db`

**Tablas principales:**
- `orders` — Pedidos de clientes
- `contacts` — Mensajes de contacto
- `products` — Productos (el jabón)


---

##  Variables de Entorno

Ver `frontend/.env.example` para la lista completa.

Variables en el .env:
```
DATABASE_URL="mysql://root:password@localhost:3306/bodyaura_db"
DOTNET_API_URL=http://localhost:5000
DOTNET_API_KEY=bodyaura-dotnet-secret-key-2025
PHP_API_URL=http://localhost:8080
NEXT_PUBLIC_PRODUCT_PRICE=180
```

---

##  Tecnologías

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 14.2 | Frontend + API Routes |
| React | 18.3 | UI Components |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Prisma ORM | 5.11 | DB access |
| Zod | 3.22 | Validation |
| react-hook-form | 7.51 | Forms |
| .NET | 8.0 | Order microservice |
| Entity Framework | 8.0 | ORM (.NET) |
| PHP | 8.2 | Backend alternativo |
| MySQL | 8.0 | Base de datos |
| Docker | - | Containerization |

---

## Licencia

Proyecto de presentacion — Bodyaura © 2026
