import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// POST: Create a new book
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).json({ message: "Send all required fields." });
    }

    const book = await Book.create({ title, author, publishYear });
    response.status(201).json({ message: "Book created successfully!", book });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: "Internal server error" });
  }
});

// GET: Retrieve all books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: "Internal server error" });
  }
});

// GET: Retrieve a book by ID
router.get("/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }
    response.status(200).json({ book });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: "Internal server error" });
  }
});

// PUT: Update a book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;

    if (!title || !author || !publishYear) {
      return response.status(400).json({ message: "Send all required fields." });
    }

    const book = await Book.findByIdAndUpdate(
      request.params.id,
      { title, author, publishYear },
      { new: true }
    );

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    response.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: "Internal server error" });
  }
});

// DELETE: Remove a book
router.delete("/:id", async (request, response) => {
  try {
    const book = await Book.findByIdAndDelete(request.params.id);

    if (!book) {
      return response.status(404).json({ message: 'Book not found' });
    }

    response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error, message: "Internal server error" });
  }
});

export default router;
