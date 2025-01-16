const express = require('express');
const dotenv = require("dotenv").config();
const dbConnect =  require('./config/dbConnect');
const authRoutes = require("./routes/authRoutes")
const userRoutes =  require("./routes/userRoutes");

const app = express();
dbConnect();

/// middleware
app.use(express.json());


/// routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

///server 

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => { console.log(`Server Running On PORT:${PORT}`) });