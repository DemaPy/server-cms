import { config } from "dotenv";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import access from "./middlewares/access.js";

import {
  usersRouter,
  templatesRouter,
  projectsRouter,
  columnsRouter,
  dataTablesRouter,
  projectStyleRouter,
  tablesRouter,
} from "./routes/index.js";

config();
const app = express();

app.use([cors(), cookieParser(), access]);
app.use(bodyParser.json({ limit: "35mb" }));

app.use("/users", usersRouter);
app.use("/templates", templatesRouter);
app.use("/projects", projectsRouter);
app.use("/columns", columnsRouter);
app.use("/tables", tablesRouter);
app.use("/data_tables", dataTablesRouter);
app.use("/projects_style", projectStyleRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server started at port localhost:${process.env.PORT}`);
});
