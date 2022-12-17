const transactionTargetRepository = require("../repositories/transactionTargetRepository");

class transactionTargetService {
    static async createTransactionTarget({
        target_id,
        user_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {
        if (!nominalTransactionTarget) {
            return {
                status: false,
                statusCode: 400,
                message: "Nominal harus diisi",
                data: {
                    created_transactionTarget: null,
                },
            };
        }

        if (!dateTransactionTarget) {
            return {
                status: false,
                statusCode: 400,
                message: "Tanggal harus diisi",
                data: {
                    created_transactionTarget: null,
                },
            };
        }

        if (!target_id) {
            return {
                status: false,
                statusCode: 400,
                message: "id tujuan harus diisi",
                data: {
                    created_transactionTarget: null,
                },
            };
        }

        const createdTransactionTarget = await transactionTargetRepository.createdTransactionTarget({
            target_id,
            user_id,
            nominalTransactionTarget,
            dateTransactionTarget,
        });

        return {
            status: true,
            statusCode: 201,
            message: "Transaksi tujuan berhasil dibuat",
            data: {
                created_transactionTarget: createdTransactionTarget,
            },
        };
    };

    static async updateTransactionTarget({
        id,
        user_id,
        target_id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {

        const getTarget = await transactionTargetRepository.getTransactionTargetById({
            id
        });

        if (getTarget.user_id == user_id) {

            if (!target_id) {
                target_id = getTarget.target_id
            }

            if (!nominalTransactionTarget) {
                nominalTransactionTarget = getTarget.nominalTransactionTarget
            }

            if (!dateTransactionTarget) {
                dateTransactionTarget = getTarget.dateTransactionTarget
            }

            const updatedTransactionTarget = await transactionTargetRepository.updateTransactionTarget({
                id,
                target_id,
                nominalTransactionTarget,
                dateTransactionTarget,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Transaksi tujuan berhasil di perbarui",
                data: {
                    updated_transaction_target: updatedTransactionTarget,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    updated_transaction_target: null,
                },
            };
        }
    };

    static async getTransactionByTargetsId({
        id,
        nominalTransactionTarget,
        dateTransactionTarget,
    }) {
        const getTransactionByTargetsId = await transactionTargetRepository.getTransactionByTargetsId({
            id,
            nominalTransactionTarget,
            dateTransactionTarget,
        });
        return {
            status: true,
            statusCode: 200,
            message: "Berhasil menampilkan transaksi",
            data: {
                getTransactionByTargetsId: getTransactionByTargetsId,
            },
        };
    }

    static async totalNominal({
        id,
        user_id,
    }) {
        const totalNominal = await transactionTargetRepository.totalNominal({
            id,
            user_id,
        });

        return {
            status: true,
            statusCode: 201,
            message: "transaksi tujuan berhasil dijumlah",
            data: {
                total_nominal: totalNominal,
            },
        };
    };
}

module.exports = transactionTargetService;