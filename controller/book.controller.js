const Book = require('../model/book.model');
const PAGE_SIZE = 2;

exports.getAllBooks = async (req, res) => {
  try {
    const { page } = req.query;

    if (page) {
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * PAGE_SIZE;

      const totalBooks = await Book.countDocuments();
      const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE);

      return res.status(200).json({
        message: "Books retrieved successfully!",
        pagination: {
          currentPage: pageNumber,
          totalPages: Math.ceil(totalBooks / PAGE_SIZE),
          pageSize: PAGE_SIZE,
          totalBooks: totalBooks,
        },
        data: books,
      });
    }

    const allBooks = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
        message: "All books retrieved successfully!",
        totalBooks: allBooks.length,
        data: allBooks
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books.", error: true });
  }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(400).json({ message: "Book not found."});
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true });
    }
};

// for admin only
exports.createBook = async (req, res) => {
    try {
        const { title, author, genre, publicYear } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Please provide book's title and author."});
        }

        const newBook = new Book({ title, author, genre, publicYear});
        await newBook.save();

        res.status(200).json({ message: "Book created successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true});
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updateBook = await Book.findByIdAndUpdate(
            res.params.id,
            res.body,
            { new: true, runValidators: true }
        );

        if (!updateBook) {
            return res.status(400).json({ message: "Book not found to update."});
        }

        res.status(200).json({ message: "Book updated successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleteBook = await Book.findByIdAndDelete(res.params.id);

        if (!deleteBook) {
            return res.status(400).json({ message: "Book not found to delete."});
        }

        res.status(400).json({ message: "Book deleted successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true });
    }
};


