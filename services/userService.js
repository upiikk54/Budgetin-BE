const userRepository = require("../repositories/userRepository");
const cloudinary = require("../utils/cloudinary");
const SALT_ROUND = 10;
const bcrypt = require("bcrypt");
const spacing = /[\s]/;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;

class userService {

    // ------------------------- Get All Users ------------------------- //
    static async getAllUsers() {
        try {
            const getAllUsers = await userRepository.getAllUsers();

            return {
                status: true,
                statusCode: 200,
                message: "Berhasil mengambil data pengguna",
                data: {
                    getAllData: getAllUsers,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    getAllData: null,
                },
            };
        }
    };
    // ------------------------- End Get All Users ------------------------- //

    // ------------------------- Get User By Id ------------------------- //
    static async getUserById({
        id,
    }) {
        try {
            const getUserById = await userRepository.getUserById({
                id,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Berhasil mengambil data pengguna berdasarkan id",
                data: {
                    getUserById: getUserById,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    getUserById: null,
                },
            };
        }
    };
    // ------------------------- End Get User By Id ------------------------- //


    // ------------------------- Update User By Id ------------------------- //
    static async updateUserById({
        id,
        dateOfBirth,
        gender,
        image
    }) {

        const getUserById = await userRepository.getUserById({
            id
        });

        if (getUserById.id == id) {

            let images = "";

            if (image) {
                const fileBase64 = image.buffer.toString("base64");
                const file = `data:${image.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images = cloudinaryImage.url;
            } else {
                images = getUserById.image
            }

            const updatedUser = await userRepository.updateUserById({
                id,
                dateOfBirth,
                gender,
                image: images
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pengguna telah berhasil diperbarui",
                data: {
                    updatedUser: updatedUser,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    updatedUser: null,
                },
            };
        }
    };
    // ------------------------- End Update User By Id ------------------------- //


    // ------------------------- Reset Password By Id ------------------------- //
    static async resetPasswordById({
        id,
        password,
    }) {
        const passworUppercase = password.match(upperCaseLetters);
        const passworNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);

        if (!password) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus diisi",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!passworUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung huruf besar",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!passworNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung angka",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Password tidak boleh diberi spasi",
                data: {
                    registeredUsers: null,
                },
            };
        }

        const getUserById = await userRepository.getUserById({
            id
        });

        if (getUserById.id == id) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const reserPassword = await userRepository.resetPasswordById({
                id,
                password: hashedPassword
            });


            return {
                status: true,
                statusCode: 200,
                message: "Pengguna telah berhasil Reset Kata Sandi",
                data: {
                    reserPassword: reserPassword,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    reserPassword: null,
                },
            };
        }
    };
    // ------------------------- End Reset Password By Id ------------------------- //

    static async getTransactionIncomeByUserId({
        id,
        descriptionIncome,
        priceIncome,
        dateIncome,
    }) {
        try {
            const getTransactionIncomeByUserId = await userRepository.getTransactionIncomeByUserId({
                id,
                descriptionIncome,
                priceIncome,
                dateIncome,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pemasukan berhasil didapatkan.",
                data: {
                    getTransactionIncomeByUserId: getTransactionIncomeByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    getTransactionIncomeByUserId: null,
                },
            };
        }

    };

    static async getTransactionOutcomeByUserId({
        id,
        descriptionOutcome,
        priceOutcome,
        dateOutcome,
    }) {
        try {
            const getTransactionOutcomeByUserId = await userRepository.getTransactionOutcomeByUserId({
                id,
                descriptionOutcome,
                priceOutcome,
                dateOutcome,
            });

            return {
                status: true,
                statusCode: 200,
                message: "Pengeluaran berhasil didapatkan.",
                data: {
                    getTransactionOutcomeByUserId: getTransactionOutcomeByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    getTransactionOutcomeByUserId: null,
                },
            };
        }

    };

    static async getTargetByUserId({
        id,
        nameTarget,
        nominalTarget,
        dateTarget,
        image
    }) {
        try {
            const getTargetByUserId = await userRepository.getTargetByUserId({
                id,
                nameTarget,
                nominalTarget,
                dateTarget,
                image
            });

            return {
                status: true,
                statusCode: 200,
                message: "Berhasil menampilkan tujuan",
                data: {
                    getTargetByUserId: getTargetByUserId,
                },
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    getTargetByUserId: null,
                },
            };
        };
    };
};

module.exports = userService;