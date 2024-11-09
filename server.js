const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');

//config env file 
dotenv.config();

//rest object 
const app = express();

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


//routes
app.get('/', (req, res) => {
    res.send('Hello World')
})  

//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});