import express from "express";
import dotenv from "dotenv";
import moviesRouter from "./routes/movies.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/movies", moviesRouter);

export default app;
