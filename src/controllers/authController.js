const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({ username, password: hashPassword, role });
        newUser.save();

        res.status(201).json({ message: `User resgistered with username ${username}` });
    } catch (err) {
        res.status(500).json({ message: `opps something went wrong while registration ` });
    }
};

const login = async (req, res) => {
    try {
        console.log("in login api");
        const { username, password } = req.body;

        const user = await User.findOne({username});

        if (!user) {
            res.status(404).json({ message: `user not found with username ${username}` });
        }
        // console.log("password ",password);
        // console.log("user.password ",user.password);
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(400).json({ message: `credentials invalid for  username ${username}` });
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});

        res.status(200).json({token});

    } catch (err) {
        res.status(500).json({ message: `opps something went wrong while login ${err}` });
    }
};

module.exports = {
    register, login
}