const transactionTargetService = require("../services/transactionTargetService");

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
}

module.exports = {
    createTransactionTarget,
    totalNominal,
    updateTransactionTarget,
    getTransactionByTargetsId
}