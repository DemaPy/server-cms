import { Router } from "express";
import { pool } from "../../db/index.js";

const columnsRouter = Router();

columnsRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM columns;");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

columnsRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO columns (id, table_id, header, type) VALUES ($1, $2, $3, $4) RETURNING *;";
  const values = [
    data.id,
    data.table_id,
    data.header,
    data.type,
  ];

  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

columnsRouter.patch("/", async (req, res) => {
  const data = req.body;
  let query;
  if ("header" in data) {
    query = `UPDATE columns SET header='${data.header}' WHERE id = '${data.id}' RETURNING *;`;
  }
  try {
    const response_db_get = await pool.query(query);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default columnsRouter;
