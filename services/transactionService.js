const transactionRepository = require('../repositories/transactionRepository')

class transactionService {
    static async createTransactionIncome({
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    }) {
        if (!priceIncome) {
            return {
                status: false,
                statusCode: 400,
                message: "price income is required",
                data: {
                    created_transaksi: null,
                },
            };
        }

        if (!categoryIncome) {
            return {
                status: false,
                statusCode: 400,
                message: "price income is required",
                data: {
                    created_transaksi: null,
                },
            };
        }

        if (!dateIncome) {
            return {
                status: false,
                statusCode: 400,
                message: "date income is required",
                data: {
                    created_transaksi: null,
                },
            };
        }

        if (!descriptionIncome) {
            return {
                status: false,
                statusCode: 400,
                message: "description income is required",
                data: {
                    created_transaksi: null,
                },
            };
        }

        const createTransactionIncome = await transactionRepository.createTransactionIncome({
            user_id,
            priceIncome,
            categoryIncome,
            dateIncome,
            descriptionIncome,
        });

        return {
            status: true,
            statusCode: 201,
            message: "created transaction Income successfully",
            data: {
                created_transaksiIncome: createTransactionIncome,
            },
        };
    };

    static async updateTransactionIncomeById({
        id,
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    }) {
        const getTransactionIncomeById = await transactionRepository.getTransactionIncomeById({
            id
        })

        if (getTransactionIncomeById.user_id == user_id) {

            if (!priceIncome) {
                priceIncome = getTransactionIncomeById.priceIncome
            }

            if (!categoryIncome) {
                categoryIncome = getTransactionIncomeById.categoryIncome
            }

            if (!categoryIncome) {
                categoryIncome = getTransactionIncomeById.categoryIncome
            }

            if (!dateIncome) {
                dateIncome = getTransactionIncomeById.dateIncome
            }

            if (!descriptionIncome) {
                descriptionIncome = getTransactionIncomeById.descriptionIncome
            }

            const updateTransactionIncomeById = await transactionRepository.updateTransactionIncomeById({
                id,
                priceIncome,
                categoryIncome,
                dateIncome,
                descriptionIncome,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Transaction Income updated successfully",
                data: {
                    updateTransactionIncomeById: updateTransactionIncomeById,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    updateTransactionIncomeById: null,
                },
            };
        }

    };


    static async deleteTransactionIncomeByUserId({
        id,
        user_id,
    }) {
        const getTransactionIncomeById = await transactionRepository.getTransactionIncomeById({
            id
        });

        if (getTransactionIncomeById.user_id == user_id) {
            const deleteTransactionIncomeByUserId = await transactionRepository.deleteTransactionIncomeByUserId({
                id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Transaction Income deleted successfully",
                data: {
                    deleteTransactionIncomeByUserId: deleteTransactionIncomeByUserId,
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

    static async createTransactionOutcome({
        user_id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    }) {
        if (!priceOutcome) {
            return {
                status: false,
                statusCode: 400,
                message: "price Outcome is required",
                data: {
                    createTransactionOutcome: null,
                },
            };
        }

        if (!categoryOutcome) {
            return {
                status: false,
                statusCode: 400,
                message: "price Outcome is required",
                data: {
                    createTransactionOutcome: null,
                },
            };
        }

        if (!dateOutcome) {
            return {
                status: false,
                statusCode: 400,
                message: "date Outcome is required",
                data: {
                    createTransactionOutcome: null,
                },
            };
        }

        if (!descriptionOutcome) {
            return {
                status: false,
                statusCode: 400,
                message: "description Outcome is required",
                data: {
                    createTransactionOutcome: null,
                },
            };
        }

        const createTransactionOutcome = await transactionRepository.createTransactionOutcome({
            user_id,
            priceOutcome,
            categoryOutcome,
            dateOutcome,
            descriptionOutcome,
        });

        return {
            status: true,
            statusCode: 201,
            message: "created transaction Outcome successfully",
            data: {
                createTransactionOutcome: createTransactionOutcome,
            },
        };
    };

    static async updateTransactionOutcomeById({
        id,
        user_id,
        priceOutcome,
        categoryOutcome,
        dateOutcome,
        descriptionOutcome,
    }) {
        const getTransactionOutcomeById = await transactionRepository.getTransactionOutcomeById({
            id
        })

        if (getTransactionOutcomeById.user_id == user_id) {

            if (!priceOutcome) {
                priceOutcome = getTransactionOutcomeById.priceOutcome
            }

            if (!categoryOutcome) {
                categoryOutcome = getTransactionOutcomeById.categoryOutcome
            }

            if (!categoryOutcome) {
                categoryOutcome = getTransactionOutcomeById.categoryOutcome
            }

            if (!dateOutcome) {
                dateOutcome = getTransactionOutcomeById.dateOutcome
            }

            if (!descriptionOutcome) {
                descriptionOutcome = getProduct.descriptionOutcome
            }

            const updateTransactionOutcomeById = await transactionRepository.updateTransactionOutcomeById({
                id,
                priceOutcome,
                categoryOutcome,
                dateOutcome,
                descriptionOutcome,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Transaction Outcome updated successfully",
                data: {
                    updateTransactionOutcomeById: updateTransactionOutcomeById,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    updateTransactionOutcomeById: null,
                },
            };
        }

    };


    static async deleteTransactionOutcomeByUserId({
        id,
        user_id,
    }) {
        const getTransactionOutcomeById = await transactionRepository.getTransactionOutcomeById({
            id
        });

        if (getTransactionOutcomeById.user_id == user_id) {
            const deleteTransactionOutcomeByUserId = await transactionRepository.deleteTransactionOutcomeByUserId({
                id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Transaction Outcome deleted successfully",
                data: {
                    deleteTransactionOutcomeByUserId: deleteTransactionOutcomeByUserId,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    deleteTransactionOutcomeByUserId: null,
                },
            };
        }
    };

    static async totalIncome({
        user_id,
    }) {
        const totalIncome = await transactionRepository.totalIncome({
            user_id,
        });

        return {
            status: true,
            statusCode: 201,
            message: "Pemasukan berhasil dijumlah",
            data: {
                total_income: totalIncome,
            },
        };
    };

    static async totalOutcome({
        user_id,
    }) {
        const totalOutcome = await transactionRepository.totalOutcome({
            user_id,
        });

        return {
            status: true,
            statusCode: 201,
            message: "Pengeluaran berhasil dijumlah",
            data: {
                total_income: totalOutcome,
            },
        };
    };

    static async filteredIncome({
        descriptionIncome, priceIncome
    }) {
        try {
            const getAllTransactionIncome = await transactionRepository.getAllTransactionIncome({
                descriptionIncome, priceIncome
            });

            return {
                status: true,
                statusCode: 200,
                message: "data product berhasil ditampilkan",
                data: {
                    filteredIncome: getAllTransactionIncome,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    filtered_income: null,
                },
            };
        }
    }
    static async filteredOutcome({
        descriptionOutcome, priceOutcome
    }) {
        try {
            const getAllTransactionOutcome = await transactionRepository.getAllTransactionOutcome({
                descriptionOutcome, priceOutcome
            });

            return {
                status: true,
                statusCode: 200,
                message: "data product berhasil ditampilkan",
                data: {
                    filteredOutcome: getAllTransactionOutcome,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 500,
                message: err.message,
                data: {
                    filtered_outcome: null,
                },
            };
        }
    }
}

module.exports = transactionService;