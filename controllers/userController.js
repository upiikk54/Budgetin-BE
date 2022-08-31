const userService = require('../services/userService');

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

const updateUserById = async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        tanggal_lahir,
        jenis_kelamin,
    } = req.body;
    

    const {
        status,
        statusCode,
        message,
        data
    } = await userService.updateUserById({
        id,
        tanggal_lahir,
        jenis_kelamin,
        image: req.file,
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
}