const authService = require("../services/authService");
const { getNewOTP } = require("../helper/otpGenerator");

// ------------------------- Auth Register ------------------------- //

const register = async (req, res) => {
    const {
        userName,
        email,
        password
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.register({
        userName,
        email,
        password
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

// ------------------------- End Auth Register ------------------------- //


// ------------------------- Auth Login ------------------------- //

const login = async (req, res) => {
    const {
        userName,
        password
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.login({
        userName,
        password
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

// ------------------------- End Auth Login ------------------------- //


// ------------------------- Auth Current User ------------------------- //

const currentUser = async (req, res) => {
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: "Get current user success.",
        data: {
            user: currentUser,
        }
    });
};

// ------------------------- End Auth Current User ------------------------- //


// ------------------------- Auth Forgot Password ------------------------- //

const handleForgotPassword = async (req, res) => {

    const {email} = req.body;

    const {status, statusCode, message, data} = await authService.handleForgotPassword({
        email,
        otp: getNewOTP()
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });

}

// ------------------------- End Forgot Password ------------------------- //


// ------------------------- Reset Password ------------------------- //

const handleResetPassword = async (req, res) => {

    const { otp, password } = req.body;

    const {status, statusCode, message, data} = await authService.handleResetPassword({
        otp,
        password,
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });

};

// ------------------------- End Reset Password ------------------------- //

module.exports = {
    register,
    login,
    currentUser,
    handleForgotPassword,
    handleResetPassword
};