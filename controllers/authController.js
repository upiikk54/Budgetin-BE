const authService = require("../services/authService");

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

    res.status (200).send({
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

    const {status, status_code, message, data} = await authService.handleForgotPassword({
        email
    });

    res.status(status_code).send({
        status : status,
        message: message,
        data : data,
    });

}

// ------------------------- End Forgot Password ------------------------- //

module.exports = {
    register,
    login,
    currentUser,
    handleForgotPassword
};