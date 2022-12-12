const cloudinary = require("../utils/cloudinary");
const targetRepository = require("../repositories/targetRepository")

class targetService {
    static async createTarget({
        user_id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image,
    }) {
        if (!nameTarget) {
            return {
                status: false,
                statusCode: 400,
                message: "Nama tujuan harus diisi",
                data: {
                    created_target: null,
                },
            };
        }

        if (!nominalTarget) {
            return {
                status: false,
                statusCode: 400,
                message: "Nominal tujuan harus diisi",
                data: {
                    created_target: null,
                },
            };
        }

        if (!dateTarget) {
            return {
                status: false,
                statusCode: 400,
                message: "Waktu capaian harus diisi",
                data: {
                    created_target: null,
                },
            };
        }

        if (!image) {
            return {
                status: false,
                statusCode: 400,
                message: "Gambar tujuan harus diisi",
                data: {
                    created_target: null,
                },
            };
        }

        let images = "";

        if (image) {
            const fileBase64 = image.buffer.toString("base64");
            const file = `data:${image.mimetype};base64,${fileBase64}`;
            const cloudinaryImage = await cloudinary.uploader.upload(file);
            images = cloudinaryImage.url;
        }


        const createTarget = await targetRepository.createTarget({
            user_id,
            nameTarget,
            nominalTarget,
            dateTarget,
            image: images,
        });

        return {
            status: true,
            statusCode: 201,
            message: "created transaction Income successfully",
            data: {
                created_targetIncome: createTarget,
            },
        };
    };

    static async updateTarget({
        id,
        user_id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image,
    }) {

        const getTarget = await targetRepository.getTargetById({
            id
        });

        if (getTarget.user_id == user_id) {
            let images = "";

            if (image) {
                const fileBase64 = image.buffer.toString("base64");
                const file = `data:${image.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images = cloudinaryImage.url;
            } else {
                images = getTarget.image
            }

            if (!nameTarget) {
                nameTarget = getTarget.nameTarget
            }

            if (!nominalTarget) {
                nominalTarget = getTarget.nominalTarget
            }

            if (!dateTarget) {
                dateTarget = getTarget.dateTarget
            }

            const updatedTarget = await targetRepository.updateTarget({
                id,
                nameTarget,
                nominalTarget,
                dateTarget,
                image: images,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Tujuan berhasil di perbarui",
                data: {
                    updated_target: updatedTarget,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    updated_target: null,
                },
            };
        }
    };

    static async deleteTarget({
        id,
        user_id,
    }) {
        const getTargetById = await targetRepository.getTargetById({
            id
        });

        if (getTargetById.user_id == user_id) {
            const deleteTarget = await targetRepository.deleteTarget({
                id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Tujuan berhasil dihapus",
                data: {
                    deleteTarget: deleteTarget,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    deleteTransactionIncomeByUserId: null,
                },
            };
        }
    };

    static async getTargetById({
        id,
    }) {
        const getProductById = await targetRepository.getTargetById({
            id,
        });
        return {
            status: true,
            status_code: 200,
            message: "tujuan berhasil ditampilkan",
            data: {
                getProductById: getProductById,
            },
        };
    };
}

module.exports = targetService;