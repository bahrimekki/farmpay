const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

exports.SignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "email should be unique" }] });
        }
        const emailToken = await bcrypt.hash(email, saltRounds);
        const newUser = new User({
            ...req.body,
            emailToken: emailToken,
            isVerified: false,
        });

        const hashedpassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashedpassword;

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
            to: req.body.email,
            subject: "FarmPay - verify your E-mail",
            text: `Hello, thanks for registering in our App.
            Please visite this lien to verify your account.
            http://localhost:5000/api/users/verify-email?token=${emailToken}`,
            html: `<a href="http://localhost:5000/api/users/verify-email?token=${emailToken}">verify your account</a>`,
        };
        await newUser.save();
        await transporter.sendMail(msg);
        res.status(200).send({ msg: "user is saved", newUser: newUser });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "user did not add" }] });
    }
};

exports.VerifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ emailToken: req.query.token });
        if (!user) {
            return res
                .status(400)
                .send({ errors: [{ msg: "Token is invalid" }] });
        }
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        res.status(200).send("your account is verifited");
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "account did not verifit" }] });
    }
};

exports.LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential" }] });
        }
        if (!findUser.isVerified) {
            return res.status(400).send({
                errors: [
                    {
                        msg: "your account is not verifit. pleez check your E-mail to verifie your account",
                    },
                ],
            });
        }
        const comparPass = await bcrypt.compare(password, findUser.password);
        if (!comparPass) {
            return res
                .status(400)
                .send({ errors: [{ msg: "bad credential" }] });
        }
        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.SEKRET_KEY,
            { expiresIn: "12h" }
        );
        res.status(200).send({ msg: "succesful login", user: findUser, token });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: "yous can not login" }] });
    }
};
