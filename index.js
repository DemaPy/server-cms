import { config } from "dotenv";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import access from "./middlewares/access.js";

import { usersRouter, templatesRouter, projectsRouter, columnsRouter, dataTablesRouter } from "./routes/index.js";

config();
const app = express();

app.use([express.json(), cors(), cookieParser(), access]);

app.use("/users", usersRouter);
app.use("/templates", templatesRouter);
app.use("/projects", projectsRouter);
app.use("/columns", columnsRouter);
app.use("/tables", columnsRouter);
app.use("/data-tables", dataTablesRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port localhost:${process.env.PORT}`);
});
