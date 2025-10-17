const Genre = require('../model/genre.model')
const PAGE_SIZE = 2; 

exports.getAllGenres = async (req, res) => {
  try {
    const { page } = req.query;

    if (page) {
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * PAGE_SIZE;

      const totalGenres = await Genre.countDocuments();
      const genres = await Genre.find()
        .sort({ name: 1 })
        .skip(skip)
        .limit(PAGE_SIZE);

      return res.status(200).json({
        message: "Genres retrieved successfully!",
        pagination: {
          currentPage: pageNumber,
          totalPages: Math.ceil(totalGenres / PAGE_SIZE),
          pageSize: PAGE_SIZE,
          totalItems: totalGenres,
        },
        data: genres,
      });
    }

    const allGenres = await Genre.find().sort({ name: 1 });
    return res.status(200).json({
        message: "All genres retrieved successfully!",
        totalItems: allGenres.length,
        data: allGenres
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve genres.", error: true });
  }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        if (!genre) {
            return res.status(400).json({ message: "Genre not found."});
        }

        res.status(200).json(genre)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true});
    }
};

// for admin only
exports.createGenre = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Please provide genre's name."});
        }

        const newGenre = new Genre({ name });
        await newGenre.save();

        res.status(200).json({ message: "Genre created successfully!"});
    } catch (erorr) {
        res.status(500).json({ message: "Server error", error: true });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const updateGenre = await Genre.findByIdAndUpdate(
            res.params.id,
            res.body,
            { new: true, runValidators: true }
        );

        if (!updateGenre) {
            return res.status(400).json({ message: "Genre not found to update."});
        }

        res.status(200).json({ message: "Genre updated successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true});
    }
};

exports.deletaGenre = async (req, res) => {
    try {
        const deleteBook = await Genre.findByIdAndDelete(req.params.id);

        if (!deleteBook) {
            return res.status(400).json({ message: "Genre not found to delete."});
        }

        res.status(200).json({ message: "Genre deleted successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: true });
    }
};