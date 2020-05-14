const router = require('express').Router()
const genresControllers = require('../controllers/genres')

router.get('/', genresControllers.getGenres)
//router.post('/', genresControllers.postGenres)
router.post('/', genresControllers.postGenres)
router.put('/:id', genresControllers.putGenres)
router.delete('/:id', genresControllers.deleteGenres)
module.exports = router