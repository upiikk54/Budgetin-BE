const sequelize = require("sequelize");
const {
    transactionIncome,
    transactionOutcome,
    users
} = require("../models");

class transactionRepository {
    static async createTransactionIncome({
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    }) {
        const createTransactionIncome = transactionIncome.create({
            user_id,
            priceIncome,
            categoryIncome,
            dateIncome,
            descriptionIncome,
        });

        return createTransactionIncome;
    };

    static async getAllTransactionIncome() {
        const getAllTransactionIncome = await transactionIncome.findAll();

        return getAllTransactionIncome;
    };

    static async getTransactionIncomeById({
        id
    }) {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "dateOfBirth", "gender", "image"]
            }]
        }
        if (id) {
            query.where = {
                ...query.where,
                id: id
            }
        }

        const getTransactionIncomeById = await transactionIncome.findOne(query);

        return getTransactionIncomeById;
    };

    static async updateTransactionIncomeById({
        id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    }) {
        const updateTransactionIncomeById = await transactionIncome.update({
            priceIncome,
            categoryIncome,
            dateIncome,
            descriptionIncome,
        }, {
            where: {
                id
            }
        });

        return updateTransactionIncomeById;
    };

    static async deleteTransactionIncomeByUserId({
        id
    }) {
        const deleteTransactionIncomeByUserId = transactionIncome.destroy({
            where: {
                id
            }
        });

        return deleteTransactionIncomeByUserId;
    };

    static async createTransactionOutcome({
        user_id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    }) {
        const createTransactionOutcome = transactionOutcome.create({
            user_id,
            priceOutcome,
            categoryOutcome,
            dateOutcome,
            descriptionOutcome,
        });

        return createTransactionOutcome;
    };

    static async getAllTransactionOutcome() {
        const getAllTransactionOutcome = await transactionOutcome.findAll();

        return getAllTransactionOutcome;
    };

    static async getTransactionOutcomeById({
        id
    }) {
        const query = {
            where: {},
            include: [{
                model: users,
                attributes: ["id", "userName", "email", "dateOfBirth", "gender", "image"]
            }]
        }
        if (id) {
            query.where = {
                ...query.where,
                id: id
            }
        }

        const getTransactionOutcomeById = await transactionOutcome.findOne(query);

        return getTransactionOutcomeById;
    };

    static async updateTransactionOutcomeById({
        id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    }) {
        const updateTransactionOutcomeById = await transactionOutcome.update({
            priceOutcome,
            categoryOutcome,
            dateOutcome,
            descriptionOutcome,
        }, {
            where: {
                id
            }
        });

        return updateTransactionOutcomeById;
    };

    static async deleteTransactionOutcomeByUserId({
        id
    }) {
        const deleteTransactionOutcomeByUserId = transactionOutcome.destroy({
            where: {
                id
            }
        });

        return deleteTransactionOutcomeByUserId;
    };
}

module.exports = transactionRepository;