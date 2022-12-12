const {
    targets
} = require("../models")

class targetRepository {
    static async createTarget({
        user_id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    }) {
        const createTarget = targets.create({
            user_id,
            nameTarget,
            nominalTarget,
            dateTarget,
            image
        });

        return createTarget;
    };

    static async updateTarget({
        id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    }) {
        const updateTarget = await targets.update({
            nameTarget,
            nominalTarget,
            dateTarget,
            image
        }, {
            where: {
                id
            }
        });

        return updateTarget;
    };

    static async deleteTarget({
        id
    }) {
        const deleteTarget = targets.destroy({
            where: {
                id
            }
        });

        return deleteTarget;
    };

    static async getTargetById({
        id
    }) {
        const getTarget = await targets.findOne({
            where: {
                id
            }
        });

        return getTarget;
    };
}

module.exports = targetRepository;