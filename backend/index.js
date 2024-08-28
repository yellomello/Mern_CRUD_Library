import express from "express";
import { PORT, DBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";


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
    console.log(e);
  });
