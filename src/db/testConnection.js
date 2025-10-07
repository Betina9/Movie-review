import { getConnection } from "./db.js";

try {
  const pool = await getConnection();
  console.log("✅ Tilkobling til databasen fungerer");
  const result = await pool.request().query("SELECT TOP 1 * FROM dbo.Movies");
  console.log("👉 Resultat:", result.recordset);
} catch (err) {
  console.error("❌ DB-feil:", err.message);
}
console.log("Kobler til med config:", {
  server: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
