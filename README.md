#  Product Management API

A high-performance, production-ready RESTful API for managing product
inventory.
Built with **Fastify** and **Prisma**, this backend is engineered for
speed, scalability, and enterprise-level reliability.

> Optimized for throughput
>  Secured with JWT authentication
>  Designed with caching and rate limiting

**Maintained by:** QuantaTechLabs -- Backend Core

------------------------------------------------------------------------

## 🏗 Tech Stack

  Layer                Technology
  -------------------- --------------------------------------------
  **Framework**        Fastify
  **ORM**              Prisma
  **Database**         PostgreSQL (Supabase Hosted)
  **Authentication**   JWT + bcryptjs
  **Caching**          Custom In-Memory Map (Cache-Aside Pattern)
  **Rate Limiting**    Fastify Rate Limit Plugin

------------------------------------------------------------------------

## ✨ Key Features

### Full CRUD Operations

-   Create products
-   Retrieve single or multiple products
-   Update product details
-   Delete products safely

------------------------------------------------------------------------

###  Advanced Querying

Supports: - Pagination - Sorting (`asc` / `desc`) - Filtering by: -
`category` - `minPrice` - `maxPrice`

------------------------------------------------------------------------

###  JWT-Based Authentication

Protected routes ensure only authenticated users can:
 - Create products
- Update products
- Delete products

------------------------------------------------------------------------

### ⚡ High-Performance Caching

-   GET requests are cached in memory
-   Implements Cache-Aside pattern
-   Reduces database load significantly
-   Improves response time dramatically

------------------------------------------------------------------------

### 🛡 Rate Limiting

-   100 requests per minute per IP
-   Prevents brute-force attacks
-   Protects against API abuse

------------------------------------------------------------------------

### 🧼 Input Sanitization

-   Prevents null-byte injection
-   Validates and sanitizes user input
-   Ensures database integrity

------------------------------------------------------------------------

## 📊 Performance Benchmarks

Load tested using `autocannon` with: - 50 concurrent connections\
- 10-second duration

### 📈 Results

  Metric                         Result
  ------------------------------ ---------
  Total Requests Processed       43,000+
  Average Requests/Second        \~3,906
  Data Transferred               91.2 MB
  Average Latency                12.3 ms
  Minimum Latency (Cache Hit)    3 ms
  Maximum Latency (Cache Miss)   902 ms
  Failed Requests                0

### 🧪 Test Command

``` bash
npx autocannon -c 50 -d 10 http://localhost:3000/api/v1/products
```

------------------------------------------------------------------------

# 🚀 Getting Started

## 1️⃣ Clone & Install

``` bash
git clone <repository-url>
cd Product_Management_API
npm install
```

------------------------------------------------------------------------

## 2️⃣ Environment Variables

Create a `.env` file in the root directory:

``` env
PORT=3000
DATABASE_URL="postgresql://<user>:<password>@<supabase-host>:5432/postgres?pgbouncer=true"
JWT_SECRET="your_super_secret_jwt_key"
```

------------------------------------------------------------------------

## 3️⃣ Database Setup

Generate Prisma client and push schema:

``` bash
npx prisma generate
npx prisma db push
```

------------------------------------------------------------------------

## 4️⃣ Seed the Database

Populate the database with 100 randomized products:

``` bash
node src/utils/seed.js
```

------------------------------------------------------------------------

## 5️⃣ Start the Server

### Development Mode

``` bash
npm run dev
```

### Production Mode

``` bash
npm start
```

------------------------------------------------------------------------

# 📡 API Endpoints

## 🔐 Authentication

  Method   Endpoint                  Description
  -------- ------------------------- -----------------------------
  POST     `/api/v1/auth/register`   Register new user
  POST     `/api/v1/auth/login`      Login and receive JWT token

------------------------------------------------------------------------

## 📦 Products

  --------------------------------------------------------------------------------
  Method       Endpoint                 Description        Auth Required
  ------------ ------------------------ ------------------ -----------------------
  GET          `/api/v1/products`       Get all products   ❌
                                        (Cached +          
                                        Paginated)         

  GET          `/api/v1/products/:id`   Get single product ❌

  POST         `/api/v1/products`       Create new product ✅

  PUT          `/api/v1/products/:id`   Update product     ✅

  DELETE       `/api/v1/products/:id`   Delete product     ✅
  --------------------------------------------------------------------------------

------------------------------------------------------------------------

