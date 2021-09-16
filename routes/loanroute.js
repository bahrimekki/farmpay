const express = require("express");
const router = express.Router();
const { GetLoan, ConfirmLoan } = require("../controllers/loan.controllers");
const isAuth = require("../middleware/isAuth");

router.post("/GetLoan", GetLoan);

router.get("/confirm-loan", ConfirmLoan);

module.exports = router;
