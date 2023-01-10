const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute')
dotenv?.config();

const PORT = process.env.PORT || 8000
connectDB();


// middleware
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// endpoints
app.use('/api/v1/user', userRoute)


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})


