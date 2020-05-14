const router = require("express").Router();
const booksController = require("../controllers/books");
// const upload = require("../config/upload");

router.get("/", booksController.getBooks);
router.post("/", booksController.postBooks);
router.put("/:id", booksController.putBooks);
router.delete("/:id", booksController.deleteBooks);

// router.get("/asek", (req, res) => {
//   const { title, desc, genre } = req.body;
//   const { sort, field, offset, limit } = req.query;

//   res.status(200).json({ msg: "oke", data: [] });
// });

module.exports = router;
