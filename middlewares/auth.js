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
            message: "Kamu harus login untuk mengakses fitur ini.",
            data: null,
        });

    try {
        const {
            email
        } = jwt.verify(token, JWT.SECRET);

        const getUsersByEmail = await userRepository.getUsersByEmail({
            email
        });

        req.user = getUsersByEmail;

        next();
    } catch (err) {
        return res.status(401).send({
            status: false,
            message: "Sesi telah kedaluwarsa. Silahkan Login Kembali",
            data: null,
        });
    }
};

module.exports = {
    authenticate
}