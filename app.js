const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const index = require('./routes/index')
const studentRoutes = require('./routes/students')
const examRoutes = require('./routes/exams')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/students', studentRoutes)
app.use('/exams', examRoutes)

app.listen(3000)
