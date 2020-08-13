const express = require('express')

const router = express.Router()

const StudentController = require('../controllers/studentController')

router.get('/', StudentController.findAll)
router.get('/:id', StudentController.findById)

module.exports = router
