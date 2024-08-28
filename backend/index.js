import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PORT, DBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', booksRoute);

//DB Connection
mongoose.connect(DBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("DB error", e);
  });
