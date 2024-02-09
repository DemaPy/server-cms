import { Router } from "express";
import { pool } from "../../db/index.js";

const templatesRouter = Router();

templatesRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM templates;");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

templatesRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO templates (id, template_html, template_name) VALUES ($1, $2, $3) RETURNING *;";
  const values = [data.id, data.template_html, data.template_name];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

templatesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM templates WHERE id = '${id}' RETURNING *;`;
  try {
    const response_db_get = await pool.query(query);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

templatesRouter.patch("/", async (req, res) => {
  const data = req.body;
  let query;
  if ("isarchived" in data) {
    query = `UPDATE templates SET isarchived=${data.isarchived} WHERE id = '${data.id}' RETURNING *;`;
  }
  try {
    const response_db_get = await pool.query(query);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default templatesRouter;
