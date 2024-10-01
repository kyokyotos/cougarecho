import express from "express";
import { getConnectionPool } from "../database.js"; // Use ES module import

const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const pool = await getConnectionPool(); // Get the connection pool
    const result = await pool.request().query("SELECT * FROM UserRole");
    //console.dir(result.recordset)
    res.json(result.recordset); // Send back the result
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.get("/test", (req, res) => {
    res.json([{"test" : "hello world!"}])
})
export default router;
