const transactionService = require('../services/transactionService');

// ------------------------- create Transaction Income ------------------------- //
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
// ------------------------- End createTransactionIncome ------------------------- //

// ------------------------- Update Transaction Income By Id ------------------------- //
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
// ------------------------- End Update Transaction Income By Id ------------------------- //

// ------------------------- Delete Transaction Income By User Id ------------------------- //
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
// ------------------------- End Delete Transaction Income By Id ------------------------- //

// ------------------------- create Transaction Outcome ------------------------- //
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
};
// ------------------------- End create Transaction Outcome ------------------------- //

// ------------------------- Update Transaction Outcome By Id ------------------------- //
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
// ------------------------- End Update Transaction Outcome By Id ------------------------- //

// ------------------------- Delete Transaction Outcome By User Id ------------------------- //
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
// ------------------------- End Delete Transaction Outcome By User Id ------------------------- //

// ------------------------- Total Income ------------------------- //
const totalIncome = async (req, res) => {

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionService.totalIncome({
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Total Income ------------------------- //

// ------------------------- Total Outcom e------------------------- //
const totalOutcome = async (req, res) => {

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionService.totalOutcome({
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Total Outcome ------------------------- //

// ------------------------- Filtered Income ------------------------- //
const filteredIncome = async (req, res) => {
    const { descriptionIncome, priceIncome } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.filteredIncome({descriptionIncome, priceIncome });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Filtered Income ------------------------- //

// ------------------------- Filtered Outcome ------------------------- //
const filteredOutcome = async (req, res) => {
    const { descriptionOutcome, priceOutcome } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionService.filteredOutcome({descriptionOutcome, priceOutcome });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Filtered Outcome ------------------------- //

module.exports = {
    createTransactionIncome,
    filteredOutcome,
    filteredIncome,
    totalIncome,
    totalOutcome,
    updateTransactionIncomeById,
    deleteTransactionIncomeByUserId,
    createTransactionOutcome,
    updateTransactionOutcomeById,
    deleteTransactionOutcomeByUserId
}