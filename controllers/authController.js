const authService = require("../services/authService");
const { generatedOTP } = require("../helper/otpGenerator");

// ------------------------- Auth Register ------------------------- //

const handleRegister = async (req, res) => {
    const {
        userName,
        email,
        password,
        isAgree
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleRegister({
        userName,
        email,
        password,
        isAgree
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data
    });
};

// ------------------------- End Auth Register ------------------------- //


// ------------------------- Auth Login ------------------------- //

const handleLogin = async (req, res) => {
    const {
        userName,
        password
    } = req.body;

    const {
        status,
        statusCode,
        message,
        data
    } = await authService.handleLogin({
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

    const { email } = req.body;

    const {status, statusCode, message, data} = await authService.handleForgotPassword({
        email,
        otp: generatedOTP()
    });

    res.status(statusCode).send({
        status : status,
        message: message,
        data : data,
    });

}

// ------------------------- End Auth Forgot Password ------------------------- //


// ------------------------- Auth Reset Password ------------------------- //

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

// ------------------------- End Auth Reset Password ------------------------- //


// ------------------------- Auth Login With Google ------------------------- //

const handleLoginWithGoogle = async(req, res) => {

    const { google_credential } = req.body;

    const { status, statusCode, message, data } = await authService.handleLoginWithGoogle({
        google_credential
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });

};

// ------------------------- End Auth Login With Google ------------------------- //

module.exports = {
    handleRegister,
    handleLogin,
    currentUser,
    handleForgotPassword,
    handleResetPassword,
    handleLoginWithGoogle
};