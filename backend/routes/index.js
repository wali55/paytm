const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({msg: "Token not found"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({user: decoded});
    } catch (error) {
        console.log('error', error);
        return res.status(401).json({msg: "Invalid or expired token!"});
    }
})

module.exports = router;