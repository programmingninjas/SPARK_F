const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const colors = require('colors')
var cors = require('cors')
const connectDB = require('./database/db')
const port = process.env.PORT 

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/isaa',require('./routes/isaaRoutes'))
app.use('/api/social',require('./routes/socialRoutes'))
app.use('/api/dev',require('./routes/devRoutes'))
app.use('/api/scale',require('./routes/scaleRoutes'))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/physicaltime',require('./routes/physicalRoutes'))

app.use(errorHandler)

app.listen(port,()=>console.log(`Server started on port ${port}`))
