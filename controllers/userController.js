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

// ------------------------- Get Transaction Income By User Id ------------------------- //
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
// ------------------------- End Get Transaction Income By User Id ------------------------- //

// ------------------------- Get Transaction Outcome By User Id ------------------------- //
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
// ------------------------- End Get Transaction Outcome By User Id ------------------------- //

// ------------------------- Get Target By User Id ------------------------- //
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
// ------------------------- End Get Target By User Id ------------------------- //

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    getTransactionIncomeByUserId,
    getTransactionOutcomeByUserId,
    getTargetByUserId,
};