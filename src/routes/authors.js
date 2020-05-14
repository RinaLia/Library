// Declare & Initialize express router
const router = require("express").Router();
const authorsControllers = require("../controllers/authors");

router.get("/", authorsControllers.getAuthors);
router.post("/", authorsControllers.postAuthors);
router.put("/:id", authorsControllers.putAuthors);
router.delete("/:id", authorsControllers.deleteAuthors);

module.exports = router;
