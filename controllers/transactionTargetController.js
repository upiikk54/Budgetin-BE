const transactionTargetService = require("../services/transactionTargetService");

// ------------------------- create Transaction Target ------------------------- //
const createTransactionTarget = async (req, res) => {
    const {
        target_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionTargetService.createTransactionTarget({
        target_id,
        user_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End create Transaction Target ------------------------- //

// ------------------------- Update Transaction Target ------------------------- //
const updateTransactionTarget = async (req, res) => {
    const {
        target_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    } = req.body;

    const {
        id
    } = req.params

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionTargetService.updateTransactionTarget({
        id,
        target_id,
        user_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End update Transaction Target ------------------------- //

// ------------------------- Get Transaction Target By Targets Id ------------------------- //
const getTransactionByTargetsId = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        nominalTransactionTarget,
        dateTransactionTarget,
    } = req.query;

    const {
        status,
        statusCode,
        message,
        data
    } = await transactionTargetService.getTransactionByTargetsId({
        id,
        nominalTransactionTarget,
        dateTransactionTarget,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Get Transaction Target By Targets Id ------------------------- //

// ------------------------- Total Nominal ------------------------- //
const totalNominal = async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await transactionTargetService.totalNominal({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};
// ------------------------- End Total Nominal ------------------------- //

module.exports = {
    createTransactionTarget,
    totalNominal,
    updateTransactionTarget,
    getTransactionByTargetsId
}