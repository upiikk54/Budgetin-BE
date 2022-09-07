const userRepository = require("../repositories/userRepository");
const cloudinary = require("../utils/cloudinary");
const SALT_ROUND = 10;
const bcrypt = require("bcrypt");
const spacing = /[\s]/;
const upperCaseLetters  = /[A-Z]/g;
const numbers  = /[0-9]/g;

class userService {

    // ------------------------- Get All Users ------------------------- //

    static async getAllUsers() {

        const getAllUsers = await userRepository.getAllUsers();

        return {
            status: true,
            statusCode: 200,
            message: "successfully retrieve user data",
            data: {
                getAllData: getAllUsers,
            },
        };
        
    };

    // ------------------------- End Get All Users ------------------------- //


    // ------------------------- Get User By Id ------------------------- //

    static async getUserById({
        id,
    }) {

        const getUserById = await userRepository.getUserById({
            id,
        });

        return {
            status: true,
            statusCode: 200,
            message: "successfully retrieve user data based on id",
            data: {
                getUserById: getUserById,
            },
        };
    };

    // ------------------------- End Get User By Id ------------------------- //


    // ------------------------- Update User By Id ------------------------- //
    
    static async updateUserById({
        id,
        tanggal_lahir,
        jenis_kelamin,
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
                tanggal_lahir,
                jenis_kelamin,
                image: images
            });


            return {
                status: true,
                statusCode: 200,
                message: "user has been successfully updated",
                data: {
                    updatedUser: updatedUser,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
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
                message: "Password is required",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password minimum 8 characters",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!passworUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have uppercase",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!passworNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have numbers",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Password cannot be spaced",
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
                message: "user has been successfully Reset Password",
                data: {
                    reserPassword: reserPassword,
                },
            };
        } else {
            return {
                status: true,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    reserPassword: null,
                },
            };
        }
    };

    // ------------------------- End Reset Password By Id ------------------------- //
};

module.exports = userService;