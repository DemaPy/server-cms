import { Router } from "express";
import { pool } from "../../db/index.js";

const projectsRouter = Router();

projectsRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM projects;");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

projectsRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO projects (id, project_name, template_id) VALUES ($1, $2, $3) RETURNING *;";
  const values = [data.id, data.project_name, data.template_id];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default projectsRouter;
