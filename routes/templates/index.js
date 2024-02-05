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
    "INSERT INTO templates (template_html, template_name) VALUES ($1, $2) RETURNING *;";
  const values = [data.template_html, data.template_name];
  try {
    const response_db_get = await pool.query(query, values);

    console.log(response_db_get);
    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default templatesRouter;
