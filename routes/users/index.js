import { Router } from "express";
import { pool } from "../../db/index.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const response_db_get = await pool.query("SELECT * FROM users");

    res.status(200).json(response_db_get.rows);
  } catch (error) {
    console.log(error);
  }
});

export default usersRouter;
