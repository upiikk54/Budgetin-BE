const targetService = require("../services/targetService")

const createTarget = async (req, res) => {
    const {
        nameTarget,
        nominalTarget,
        dateTarget,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await targetService.createTarget({
        user_id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image: req.file,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const updateTarget = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        nameTarget,
        nominalTarget,
        dateTarget,
    } = req.body;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } =
    await targetService.updateTarget({
        id,
        user_id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image: req.file,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteTarget = async (req, res) => {
    const {
        id
    } = req.params;

    const user_id = req.user.id;

    const {
        status,
        statusCode,
        message,
        data
    } = await targetService.deleteTarget({
        id,
        user_id,
    });

    res.status(statusCode).send({
        status: status,
        message: message,
        data: data,
    });
};

const getTargetById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await targetService.getTargetById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    createTarget,
    getTargetById,
    updateTarget,
    deleteTarget
}