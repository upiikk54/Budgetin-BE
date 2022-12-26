const transactionRepository = require('../repositories/transactionRepository')

class transactionService {
    static async createTransactionIncome({
        user_id,
        priceIncome,
        categoryIncome,
        dateIncome,
        descriptionIncome,
    }) {
        try {
            if (!priceIncome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal pemasukan harus diisi.",
                    data: {
                        created_transaksiIncome: null,
                    },
                };
            }

            if (!categoryIncome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Kategori pemasukan harus diisi.",
                    data: {
                        created_transaksiIncome: null,
                    },
                };
            }

            if (!dateIncome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Tanggal pemasukan harus diisi.",
                    data: {
                        created_transaksiIncome: null,
                    },
                };
            }

            if (!descriptionIncome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Catatan harus diisi.",
                    data: {
                        created_transaksiIncome: null,
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
                message: "Berhasil membuat pemasukan.",
                data: {
                    created_transaksiIncome: createTransactionIncome,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    created_transaksiIncome: null,
                },
            };
        }

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
                message: "Pemasukan berhasil diperbarui",
                data: {
                    updateTransactionIncomeById: updateTransactionIncomeById,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
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
                message: "Pemasukan berhasil dihapus.",
                data: {
                    deleteTransactionIncomeByUserId: deleteTransactionIncomeByUserId,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
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
        try {
            if (!priceOutcome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Nominal pengeluaran harus diisi.",
                    data: {
                        created_transaksiOutcome: null,
                    },
                };
            }

            if (!categoryOutcome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Kategori pengeluaran harus diisi.",
                    data: {
                        created_transaksiOutcome: null,
                    },
                };
            }

            if (!dateOutcome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Tanggal pengeluaran harus diisi.",
                    data: {
                        created_transaksiOutcome: null,
                    },
                };
            }

            if (!descriptionOutcome) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Catatan pengeluaran harus diisi.",
                    data: {
                        created_transaksiOutcome: null,
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
                message: "Berhasil membuat pengeluaran.",
                data: {
                    created_transaksiOutcome: createTransactionOutcome,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    created_transaksiOutcome: null,
                },
            };
        }
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
                message: "Pengeluaran berhasil diperbarui.",
                data: {
                    updateTransactionOutcomeById: updateTransactionOutcomeById,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
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
                message: "Pengeluaran berhasil dihapus.",
                data: {
                    deleteTransactionOutcomeByUserId: deleteTransactionOutcomeByUserId,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    deleteTransactionOutcomeByUserId: null,
                },
            };
        }
    };

    static async totalIncome({
        user_id,
    }) {
        try {
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
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    total_income: null,
                },
            };
        }

    };

    static async totalOutcome({
        user_id,
    }) {
        try {
            const totalOutcome = await transactionRepository.totalOutcome({
                user_id,
            });
            return {
                status: true,
                statusCode: 201,
                message: "Pengeluaran berhasil dijumlah",
                data: {
                    total_Outcome: totalOutcome,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    total_Outcome: null,
                },
            };
        }
    };

    static async filteredIncome({
        descriptionIncome,
        priceIncome
    }) {
        try {
            const getAllTransactionIncome = await transactionRepository.getAllTransactionIncome({
                descriptionIncome,
                priceIncome
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
    };
    
    static async filteredOutcome({
        descriptionOutcome,
        priceOutcome
    }) {
        try {
            const getAllTransactionOutcome = await transactionRepository.getAllTransactionOutcome({
                descriptionOutcome,
                priceOutcome
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
    };
}

module.exports = transactionService;