const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: "../.env" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@savorybite.com").toLowerCase();
const ADMIN_NAME = process.env.ADMIN_NAME || "SavoryBite Admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin12345";

async function seedAdmin() {
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const { rows } = await pool.query(
    `INSERT INTO users(name, email, password, role)
     VALUES($1, $2, $3, 'admin')
     ON CONFLICT (email)
     DO UPDATE SET role = 'admin'
     RETURNING id, name, email, role`,
    [ADMIN_NAME, ADMIN_EMAIL, hashed]
  );
  console.log("Admin ensured:", rows[0]);
  await pool.end();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
