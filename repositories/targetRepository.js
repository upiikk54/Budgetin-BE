const {
    targets
} = require("../models")

class targetRepository {
    // ------------------------- Create Target ------------------------- //
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
    // ------------------------- End Create Target ------------------------- //

    // ------------------------- Update Target ------------------------- //
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
    // ------------------------- End Update Target ------------------------- //

    // ------------------------- Delete Target ------------------------- //
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
    // ------------------------- End Delete Target ------------------------- //

    // ------------------------- Get Target By Id ------------------------- //
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
    // ------------------------- End Get Target By Id ------------------------- //
}

module.exports = targetRepository;