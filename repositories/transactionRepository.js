const sequelize = require("sequelize");
const { Op } = require("sequelize");
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

    static async getAllTransactionIncome({
        descriptionIncome, priceIncome
    }) {
        const query = {
            where: {},
            like: {}
        }

        if (descriptionIncome) {
            const searchByDescription = await transactionIncome.findAll({
                where: {
                    [Op.or]: [
                        { descriptionIncome: { [Op.like]: '%' + descriptionIncome + '%' } },
                    ]
                },
                limit: 10,
            });

            return searchByDescription;
        }

        if (priceIncome) {
            query.where = { ...query.where, priceIncome }
        }

        const getAllTransactionIncome = await transactionIncome.findAll(query);

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

    static async getAllTransactionOutcome({
        descriptionOutcome, priceOutcome
    }) {

        const query = {
            where: {},
            like: {}
        }

        if (descriptionOutcome) {
            const searchByDescription = await transactionOutcome.findAll({
                where: {
                    [Op.or]: [
                        { descriptionOutcome: { [Op.like]: '%' + descriptionOutcome + '%' } },
                    ]
                },
                limit: 10,
            });

            return searchByDescription;
        }

        if (priceOutcome) {
            query.where = { ...query.where, priceOutcome }
        }
        const getAllTransactionOutcome = await transactionOutcome.findAll(query);

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

    static async totalIncome({
        user_id,
    }) {
        const totalIncome = await transactionIncome.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('priceIncome')), 'totalIncome']],
            where: {user_id},
            raw: true
        })
        
        return totalIncome
    };

    static async totalOutcome({
        user_id,
    }) {
        const totalOutcome = await transactionOutcome.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('priceOutcome')), 'totalOutcome']],
            where: {user_id},
            raw: true
        })
        
        return totalOutcome
    };
}

module.exports = transactionRepository;