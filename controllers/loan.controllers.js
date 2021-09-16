const Loan = require("../models/LoanModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

function getRandomString(length) {
    var randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
        );
    }
    return result;
}

exports.GetLoan = async (req, res) => {
    try {
        const dateTime = new Date();
        const Token = `{
            idUser: req.body.idUser,
            option: req.body.option,
            dateTime: dateTime,
            random: getRandomString(20),
        }`;

        const confirmToken = await bcrypt.hash(Token, saltRounds);
        const newLoan = new Loan({
            ...req.body,
            dateTime: dateTime,
            confirmToken: confirmToken,
            isConfirmed: false,
        });

        const transporter = nodemailer.createTransport({
            host: process.env.HOST_NODEMAILER,
            port: process.env.PORT_NODEMAILER,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_NODEMAILER, // generated ethereal user
                pass: process.env.PASS_NODEMAILER, // generated ethereal password
            },
        });
        const msg = {
            from: process.env.USER_NODEMAILER,
            to: "mekkibahri15@gmail.com",
            subject: "FarmPay - Loan Confirmation",
            text: `Hello, thanks for using our App.
            Please visite this lien to confirm your loan.
            http://localhost:5000/api/loans/confirm-loan?token=${confirmToken}`,
            html: `<a href="http://localhost:5000/api/loans/confirm-loan?token=${confirmToken}">confirm your loan</a>`,
        };
        await newLoan.save();
        await transporter.sendMail(msg);
        res.status(200).send({ msg: "Loan is registred" });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "Loan did not registred" }] });
    }
};

exports.ConfirmLoan = async (req, res) => {
    try {
        const loan = await Loan.findOne({ confirmToken: req.query.token });
        if (!loan) {
            return res
                .status(400)
                .send({ errors: [{ msg: "Token is invalid" }] });
        }
        loan.confirmToken = null;
        loan.isConfirmed = true;
        await loan.save();
        res.status(200).send("your loan is confirmed");
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "loan did not confirmed" }] });
    }
};
