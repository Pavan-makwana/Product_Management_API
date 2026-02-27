// src/utils/seed.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');
  
  // Clean up existing products to start fresh (Optional)
  await prisma.product.deleteMany();
  console.log('Cleaned up existing products.');

  const categories = ['Electronics', 'Home', 'Books', 'Clothing', 'Sports'];
  const products = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Product ${i}`,
      description: `Premium quality item from our ${categories[i % 5]} collection.`,
      price: parseFloat((Math.random() * (500 - 10) + 10).toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
      stock: Math.floor(Math.random() * 200) + 1,
    });
  }

  // createMany is much faster for bulk data
  const result = await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log(` Successfully seeded ${result.count} products!`);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });