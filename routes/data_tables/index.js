import { Router } from "express";
import { pool } from "../../db/index.js";

const dataTablesRouter = Router();

dataTablesRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM data_tables;");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

dataTablesRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO data_tables (id, table_id, project_id, data) VALUES ($1, $2, $3, $4) RETURNING *;";
  const values = [data.id, data.table_id, data.project_id, data.data];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default dataTablesRouter;
