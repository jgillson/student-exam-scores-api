const express = require('express')

const router = express.Router()

const ExamController = require('../controllers/examController')

router.get('/', ExamController.findAll)
router.get('/:number', ExamController.findByNumber)

module.exports = router
