const userService = require('../services/userService');

// ------------------------- Get All Users ------------------------- //

const getAllUsers = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await userService.getAllUsers();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------- End Get All Users ------------------------- //


// ------------------------- Get User By Id ------------------------- //

const getUserById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        statusCode,
        message,
        data
    } = await userService.getUserById({
        id
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------- End Get User By Id ------------------------- //


// ------------------------- Update User By Id ------------------------- //

const updateUserById = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        dateOfBirth,
        gender,
    } = req.body;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await userService.updateUserById({
        id,
        dateOfBirth,
        gender,
        image: req.file,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------- End Update User By Id ------------------------- //

// ------------------------- Reset Password By Id ------------------------- //

const resetPasswordById = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        password
    } = req.body;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await userService.resetPasswordById({
        id,
        password,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------- End Reset Password By Id ------------------------- //


const getTransactionIncomeByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        descriptionIncome,
        priceIncome,
        dateIncome,
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.getTransactionIncomeByUserId({
        id,
        descriptionIncome,
        priceIncome,
        dateIncome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTransactionOutcomeByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        descriptionOutcome,
        priceOutcome,
        dateOutcome,
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.getTransactionOutcomeByUserId({
        id,
        descriptionOutcome,
        priceOutcome,
        dateOutcome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTargetByUserId = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await userService.getTargetByUserId({
        id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    resetPasswordById,
    getTransactionIncomeByUserId,
    getTransactionOutcomeByUserId,
    getTargetByUserId,
};