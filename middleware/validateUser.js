const { validationResult, check } = require("express-validator");

exports.loginValidate = () => [
    check("email", "E-mail is requared").notEmpty(),
    check("email", "Should be E-mail").isEmail(),
    check("password", "Password is requared").notEmpty(),
    check("password", "Enter a valid password").isLength({ min: 6 }),
];

exports.signupValidate = () => [
    check("fullName", "FullName is requared").notEmpty(),
    check("email", "E-mail is requared").notEmpty(),
    check("email", "Should be E-mail").isEmail(),
    check("password", "Password is requared").notEmpty(),
    check("password", "Enter a valid password").isLength({ min: 6 }),
];
exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
