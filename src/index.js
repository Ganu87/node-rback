const express = require('express');
const dotenv = require("dotenv").config();
const dbConnect =  require('./config/dbConnect');
const authRoutes = require("./routes/authRoutes")

const app = express();
dbConnect();

/// middleware
app.use(express.json());


/// routes
app.use("/api/auth",authRoutes);


///server 

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => { console.log(`Server Running On PORT:${PORT}`) });