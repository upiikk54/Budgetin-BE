const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const SALT_ROUND = 10;
const upperCaseLetters  = /[A-Z]/g;
const numbers  = /[0-9]/g;
const addEmail =/[@]/g;
const dotEmail =/[.]/g;
const spacing = /[\s]/;
class authService {

    // ------------------------- Register ------------------------- //

    static async register({
        userName,
        email,
        password,
    }) {

        // ------------------------- Payload Validation ------------------------- //
        const passworUppercase = password.match(upperCaseLetters);
        const passworNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);
        const validationAddEmail = email.match(addEmail);
        const validationDotEmail = email.match(dotEmail);

        if (!userName) {
            return {
                status: false,
                statusCode: 400,
                message: "userName is required",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (userName.length >= 15) {
            return {
                status: false,
                statusCode: 400,
                message: "username maximum 15 characters",
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
        } else if (!validationAddEmail) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have '@' in email",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!validationDotEmail) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have '.' in email",
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
        };
    };

    // ------------------------- End Register ------------------------- //


    // ------------------------- Login ------------------------- //

    static async login({
        userName,
        password,
    }) {

        // ------------------------- Payload Validation ------------------------- //
        const passworUppercase = password.match(upperCaseLetters);
        const passworNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);

        if (!userName) {
            return {
                status: false,
                statusCode: 400,
                message: "Username is required",
                data: {
                    loginUsers: null,
                },
            };
        } else if (userName.length >= 15) {
            return {
                status: false,
                statusCode: 400,
                message: "Username or Password is wrong",
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
                    loginUsers: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Username or Password is wrong",
                data: {
                    loginUsers: null,
                },
            };
        } else if (!passworUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Username or Password is wrong",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!passworNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Username or Password is wrong",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Username or Password is wrong",
                data: {
                    registeredUsers: null,
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
                message: "Username or Password is wrong",
                data: {
                    loginUsers: null,
                },
            };
        } else {
            const isPasswordMatch = await bcrypt.compare(password, getUsersByUsername.password);

            if (isPasswordMatch) {
                const token = jwt.sign({
                        id: getUsersByUsername.id,
                        email: getUsersByUsername.email
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
                    message: "Username or Password is wrong",
                    data: {
                        user: null,
                    },
                };
            }
        }
    };

    // ------------------------- End Login ------------------------- //
}

module.exports = authService;