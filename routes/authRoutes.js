const express = require("express");

const router = express.Router();

const {
    login,
    signup,
    generateNewAccessToken
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);

router.post("/refresh", generateNewAccessToken);

module.exports = router;