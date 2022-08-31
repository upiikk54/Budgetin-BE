const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const userRepository = require("../repositories/userRepository");

const authenticate = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    let token = "";

    if (authHeader && authHeader.startsWith("Bearer"))
        token = authHeader.split(" ")[1];
    else
        return res.status(401).send({
            status: false,
            message: "You must be logged in to access this resource.",
            data: null,
        });

    try {
        const {
            userName
        } = jwt.verify(token, JWT.SECRET);

        const getUsersByUsername = await userRepository.getUsersByUsername({
            userName
        });

        req.user = getUsersByUsername;

        next();
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Session has expired. Please login again",
            data: null,
        });
    }
};

module.exports = {
    authenticate
}