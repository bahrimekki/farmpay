const express = require("express");
const router = express.Router();
const {
    LogIn,
    SignUp,
    VerifyEmail,
} = require("../controllers/user.controllers");
const isAuth = require("../middleware/isAuth");
const {
    loginValidate,
    validation,
    signupValidate,
} = require("../middleware/validateUser");

router.post("/LogIn", loginValidate(), validation, LogIn);

router.get("/current", isAuth, (req, res) => {
    res.send({
        msg: "autorised",
        user: req.user,
    });
});

router.post("/SignUp", signupValidate(), validation, SignUp);

router.get("/verify-email", VerifyEmail);

module.exports = router;
