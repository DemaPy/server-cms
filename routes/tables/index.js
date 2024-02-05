import { Router } from "express";
import { pool } from "../../db/index.js";

const tablesRouter = Router();

tablesRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM tables;");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

tablesRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO tables (table_name, template_id) VALUES ($1, $2) RETURNING *;";
  const values = [data.table_name, data.template_id];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default tablesRouter;
