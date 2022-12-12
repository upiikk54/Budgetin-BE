const sequelize = require("sequelize");
const {
    transactionIncome,
    transactionOutcome,
    users,
    targets
} = require("../models");

class userRepository {

    // ------------------------- Get All Users ------------------------- //

    static async getAllUsers() {
        const getUser = await users.findAll();

        return getUser;
    };

    // ------------------------- End Get All Users ------------------------- //


    // ------------------------- Get User By Id ------------------------- //

    static async getUserById({
        id
    }) {
        const getUser = await users.findOne({
            where: {
                id
            }
        });

        return getUser;
    };

    // ------------------------- End Get User By Id ------------------------- //


    // ------------------------- Get Users By Username ------------------------- //

    static async getUsersByUsername({
        userName
    }) {
        const getUser = await users.findOne({
            where: {
                userName: userName
            }
        });

        return getUser;
    };

    // ------------------------- End Get Users By Username ------------------------- //


    // ------------------------- Get Users By By Email ------------------------- //

    static async getUsersByEmail({
        email
    }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    };

    // ------------------------- End Get Users By By Email ------------------------- //


    // ------------------------- Register ------------------------- //

    static async register({
        userName,
        email,
        password
    }) {
        const registeredUser = users.create({
            userName,
            email,
            password
        });

        return registeredUser;
    }

    // ------------------------- End Register ------------------------- //


    // ------------------------- Update User By Id ------------------------- //

    static async updateUserById({
        id,
        dateOfBirth,
        gender,
        image
    }) {
        const updateUserById = await users.update({
            dateOfBirth,
            gender,
            image
        }, {
            where: {
                id
            }
        });

        return updateUserById;
    }

    // ------------------------- End Update User By Id ------------------------- //


    // ------------------------- Update User By Id ------------------------- //

    static async resetPasswordById({
        id,
        password
    }) {
        const resetPasswordById = await users.update({
            password
        }, {
            where: {
                id
            }
        });

        return resetPasswordById;
    }

    // ------------------------- End Update User By Id ------------------------- //

    static async getTransactionIncomeByUserId({
        id,
        descriptionIncome,
        priceIncome,
        dateIncome,
    }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = {
                ...query.where,
                user_id: id
            }
        }

        if (descriptionIncome) {
            query.where = {
                ...query.where,
                descriptionIncome
            }
        }

        if (priceIncome) {
            query.where = {
                ...query.where,
                priceIncome
            }
        }

        if (dateIncome) {
            query.where = {
                ...query.where,
                dateIncome
            }
        }

        const getTransactionIncomeByUserId = await transactionIncome.findAll(query);

        return getTransactionIncomeByUserId;
    }

    static async getTransactionOutcomeByUserId({
        id,
        descriptionOutcome,
        priceOutcome,
        dateOutcome,
    }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = {
                ...query.where,
                user_id: id
            }
        }

        if (descriptionOutcome) {
            query.where = {
                ...query.where,
                descriptionOutcome
            }
        }

        if (priceOutcome) {
            query.where = {
                ...query.where,
                priceOutcome
            }
        }

        if (dateOutcome) {
            query.where = {
                ...query.where,
                dateOutcome
            }
        }

        const getTransactionOutcomeByUserId = await transactionOutcome.findAll(query);

        return getTransactionOutcomeByUserId;
    }

    static async getTargetByUserId({
        id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    }) {
        const query = {
            where: {}
        }

        if (id) {
            query.where = {
                ...query.where,
                user_id: id
            }
        }

        if (nameTarget) {
            query.where = {
                ...query.where,
                nameTarget
            }
        }

        if (nominalTarget) {
            query.where = {
                ...query.where,
                nominalTarget
            }
        }

        if (dateTarget) {
            query.where = {
                ...query.where,
                dateTarget
            }
        }

        if (image) {
            query.where = {
                ...query.where,
                image
            }
        }

        const getTargetByUserId = await targets.findAll(query);

        return getTargetByUserId;
    }
}

module.exports = userRepository;