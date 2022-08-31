const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const SALT_ROUND = 10;

class authService {
    static async register({
        userName,
        email,
        password,
    }) {
        // Payload Validation
        if (!userName) {
            return {
                status: false,
                statusCode: 400,
                message: "userName is required",
                data: {
                    registeredUsers: null,
                },
            };
        }

        if (!email) {
            return {
                status: false,
                statusCode: 400,
                message: "Email is required",
                data: {
                    registeredUsers: null,
                },
            };
        }

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
        }

        const getUserByEmail = await userRepository.getUsersByEmail({
            email
        });

        if (getUserByEmail) {
            return {
                status: false,
                statusCode: 400,
                message: "Email already used",
                data: {
                    registeredUsers: null,
                },
            };
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const createdUser = await userRepository.register({
                userName,
                email,
                password: hashedPassword,
            });

            return {
                status: true,
                statusCode: 201,
                message: "Registration successful",
                data: {
                    registeredUsers: createdUser,
                },
            };
        }
    }

    static async login({
        userName,
        password,
    }) {
        // Payload Validation
        if (!userName) {
            return {
                status: false,
                statusCode: 400,
                message: "Username is required",
                data: {
                    loginUsers: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                statusCode: 400,
                message: "Password is required",
                data: {
                    loginUsers: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password minimum 8 characters",
                data: {
                    loginUsers: null,
                },
            };
        }

        const getUsersByUsername = await userRepository.getUsersByUsername({
            userName
        });

        if (!getUsersByUsername) {
            return {
                status: false,
                statusCode: 404,
                message: "Email not registered",
                data: {
                    loginUsers: null,
                },
            };
        } else {
            const isPasswordMatch = await bcrypt.compare(password, getUsersByUsername.password);

            if (isPasswordMatch) {
                const token = jwt.sign({
                        id: getUsersByUsername.id,
                        userName: getUsersByUsername.userName
                    },
                    JWT.SECRET, {
                        expiresIn: JWT.EXPIRED,
                    });

                return {
                    status: true,
                    statusCode: 200,
                    message: "user successfully logged in",
                    data: {
                        token,
                    },
                };
            } else {
                return {
                    status: true,
                    statusCode: 400,
                    message: "password wrong",
                    data: {
                        user: null,
                    },
                };
            }
        }
    }
}

module.exports = authService;