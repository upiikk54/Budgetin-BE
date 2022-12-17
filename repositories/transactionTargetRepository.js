const sequelize = require("sequelize");
const {
    transactiontargets,
    targets
} = require("../models");

class transactionTargetRepository {
    static async createdTransactionTarget({
        target_id,
        user_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {
        const createdTransactionTarget = transactiontargets.create({
            target_id,
            user_id,
            nominalTransactionTarget,
            dateTransactionTarget,
        });

        return createdTransactionTarget;
    };

    static async updateTransactionTarget({
        id,
        target_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {
        const updateTransactionTarget = await transactiontargets.update({
            target_id,
            nominalTransactionTarget,
            dateTransactionTarget,
        }, {
            where: {
                id
            }
        });

        return updateTransactionTarget;
    };

    static async getTransactionTargetById({
        id
    }) {
        const getTarget = await transactiontargets.findOne({
            where: {
                id
            }
        });

        return getTarget;
    };

    static async getTransactionByTargetsId({
        id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {
        const query = {
            where: {},
            include: {
                model: targets,
                attributes: ["nameTarget", "nominalTarget", "dateTarget", "image"]
            }
        }

        if (id) {
            query.where = {
                ...query.where,
                target_id: id
            }
        }
        if (nominalTransactionTarget) {
            query.where = {
                ...query.where,
                nominalTransactionTarget
            }
        }
        if (dateTransactionTarget) {
            query.where = {
                ...query.where,
                dateTransactionTarget
            }
        }

        const getTransactionByTargetsId = await transactiontargets.findAll(query);
        return getTransactionByTargetsId;
    };

    static async totalNominal({
        id,
        user_id,
    }) {
        const totalNominal = await transactiontargets.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('nominalTransactionTarget')), 'totalnominal']],
            where: {target_id: id, user_id},
            raw: true
        })
        
        return totalNominal
    };
}

module.exports = transactionTargetRepository;