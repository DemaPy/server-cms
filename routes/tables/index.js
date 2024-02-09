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
    "INSERT INTO tables (id, table_name, template_id) VALUES ($1, $2, $3) RETURNING *;";
  const values = [data.id, data.table_name, data.template_id];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

tablesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tables WHERE id = '${id}' RETURNING *;`;
  try {
    const response_db_get = await pool.query(query);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

tablesRouter.patch("/", async (req, res) => {
  const data = req.body;
  let query;
  if ("table_name" in data) {
    query = `UPDATE tables SET table_name=${data.table_name} WHERE id = '${data.id}' RETURNING *;`;
  }
  try {
    const response_db_get = await pool.query(query);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default tablesRouter;
