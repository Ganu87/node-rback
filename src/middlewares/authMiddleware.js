const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "No Token ,Authorization denied" });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("decoded usr", req.user);
            next();
        } catch (error) {
            res.status(401).json({ message: "Token is not valid" });
        }
    }else{
        res.status(500).json({ message: "No token is provided" });
    }
    
};

module.exports = verifyToken;