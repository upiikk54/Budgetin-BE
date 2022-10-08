const transactionService = require('../services/transactionService');

// ------------------------- createTransactionIncome ------------------------- //

const createTransactionIncome = async (req, res) => {
    const {
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionService.createTransactionIncome({
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

// ------------------------- and createTransactionIncome ------------------------- //


const getAllTransactionIncome = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.getAllTransactionIncome();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateTransactionIncomeById = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    } = req.body;

    const user_id = req.user.id;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.updateTransactionIncomeById({
        id,
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteTransactionIncomeByUserId = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.deleteTransactionIncomeByUserId({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const createTransactionOutcome = async (req, res) => {
    const {
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionService.createTransactionOutcome({
        user_id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
}

const getAllTransactionOutcome = async (req, res) => {
    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.getAllTransactionOutcome();

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateTransactionOutcomeById = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    } = req.body;

    const user_id = req.user.id;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.updateTransactionOutcomeById({
        id,
        user_id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteTransactionOutcomeByUserId = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.deleteTransactionOutcomeByUserId({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    createTransactionIncome,
    getAllTransactionIncome,
    updateTransactionIncomeById,
    deleteTransactionIncomeByUserId,
    createTransactionOutcome,
    getAllTransactionOutcome,
    updateTransactionOutcomeById,
    deleteTransactionOutcomeByUserId
}