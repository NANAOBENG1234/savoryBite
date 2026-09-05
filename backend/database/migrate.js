const db = require("../config/db");

const statements = [
  "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE",
];

async function migrate() {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    for (const sql of statements) {
      await client.query(sql);
      console.log("ok:", sql.split(" ").slice(0, 5).join(" "), "…");
    }
    await client.query("COMMIT");
    console.log("Migration complete.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await db.end();
  }
}

migrate();