const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware")
const router = express.Router();


// ADMIN -  only admin can access
router.get("/admin", verifyToken,authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin role" });
});

// MANAGER -- admin and manager can access
router.get("/manager", verifyToken,authorizeRoles("admin","manager"), (req, res) => {
    res.json({ message: "Welcome Manager role" });
});

// USER --  all users access
router.get("/user", verifyToken,authorizeRoles("admin","manager","user"), (req, res) => {
    res.json({ message: "Welcome User role" });
});

module.exports = router;