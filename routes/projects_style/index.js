import { Router } from "express";
import { pool } from "../../db/index.js";

const projectStyleRouter = Router();

projectStyleRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM projects_style");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

projectStyleRouter.post("/", async (req, res) => {
  const data = req.body;
  const query =
    "INSERT INTO projects_style (id, project_id, node_id, style) VALUES ($1, $2, $3, $4) RETURNING *;";
  const values = [data.id, data.project_id, data.node_id, data.style];
  try {
    const response_db_get = await pool.query(query, values);

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default projectStyleRouter;
