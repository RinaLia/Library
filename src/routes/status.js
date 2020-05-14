const router = require('express').Router()
const statusControllers = require('../controllers/status')


router.get('/', statusControllers.getStatus)
router.post('/', statusControllers.postStatus)
router.put('/:id', statusControllers.putStatus)
router.delete('/:id', statusControllers.deleteStatus)
module.exports = router