const User = require("../Models/UserModel");
var jwt = require("jsonwebtoken");
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({
                errors: [{ msg: "you are not authorised" }],
            });
        }
        const decoded = jwt.verify(token, process.env.SEKRET_KEY);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res.status(401).send({
                errors: [{ msg: "you are not authorised" }],
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ errors: [{ msg: "you are not authorised" }] });
    }
};
module.exports = isAuth;
