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

export default columnsRouter;
