import cors from "cors";
import express from 'express';
import booksRoute from "./routes/booksRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', booksRoute);

app.get('/server', (req, res) => {
  res.json({ message: 'Hello from Serverless Express API!' });
});

export { app };