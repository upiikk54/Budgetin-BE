const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const SALT_ROUND = 10;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/;

const { passwordResetEmail } = require("../helper/nodemailer");

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
                message: "Email must have @",
                data: {
                    registeredUsers: null,
                },
            };
        } else if (!validationDotEmail) {
            return {
                status: false,
                statusCode: 400,
                message: "Email must have .",
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



    // ------------------------- Forgot Password ------------------------- //

    static async handleForgotPassword({ email, otp }) {

        // ------------------------- Payload Validation ------------------------- //

        if (!email) {
            return {
                status: false,
                statusCode: 400,
                message: "Email wajib diisi",
                data: {
                    forgot_password: null,
                },
            };
        }

        const getUser = await userRepository.getUsersByEmail({ email: email });

        if (!getUser) {
            return {
                status: false,
                statusCode: 404,
                message: "Email belum terdaftar",
                data: {
                    user: null,
                },
            };
        } else {

            const emailTemplates = {
                from: 'BudgetInApp',
                to: email,
                subject: 'Konfirmasi Reset Password Akun BudgetIn Kamu',
                html:
                    `  
                        <body>
                            <section style="padding: 4% 8%;">

                                <img 
                                    src="https://res.cloudinary.com/dbplhgttm/image/upload/v1665215116/budget-in-logos_ogz2xw.png" 
                                    alt="logo-budgetin"
                                />
                                
                                <div class="content"
                                    style="
                                    margin: 2% 0 0;
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #EEF2E6;
                                    border: 2px solid #5F7161;"
                                >
                                    
                                    <h2 
                                        style="
                                        color: #000; 
                                        text-decoration: none; 
                                        list-style: none"
                                    > Halo ${getUser.email}, </h2>
                                    
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                        Untuk mengkonfirmasi permintaan reset password akun BudgetIn kamu, silakan salin OTP di bawah ini.
                                    </p>
                    
                                    <p  class="otp"
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        padding: 2%;
                                        background-color: #38a3a5;
                                        color: #fff;
                                        font-weight: 700;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;
                                        border-radius: 5px;"
                                    >
                                        ${otp}
                                    </p>

                                    <p  style="text-align: center; font-size: 16px; color: #000;"> 
                                        Jika kamu tidak meminta reset password, silakan abaikan email ini.
                                    </p>
                                </div>
                            </section>    
                        </body>
                `
            };

            passwordResetEmail(emailTemplates);

            const updateToken = await userRepository.handleUpdateUserToken({ email, otp });

            return {
                status: true,
                statusCode: 201,
                message: "Reset password terkirim ke email user!",
                data: {
                    updateToken
                }
            };
        }
    };

    // ------------------------- End Forgot Password ------------------------- //



    // ------------------------- Reset Password ------------------------- //

    static async handleResetPassword({ token, password }) {

        // ------------------------- Payload Validation ------------------------- //
        const passwordUppercase = password.match(upperCaseLetters);
        const passwordNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);

        if (!password) {
            return {
                status: false,
                statusCode: 400,
                message: "Password is required",
                data: {
                    resetPassword: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must more than 8",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have Uppercase",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Password must have Number",
                data: {
                    resetPassword: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Password doesn't allow spaces",
                data: {
                    resetPassword: null,
                },
            };
        }

        const getUserData = await userRepository.handleGetUserToken({
            token,
            password
        });

        if (getUserData.resetPasswordToken == token) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

            const updateUserPassword = await userRepository.handleUpdateUserPassword({
                token,
                password: hashedPassword
            });

            return {
                status: true,
                statusCode: 201,
                message: "User berhasil ganti password",
                data: {
                    updateUserPassword,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Resource Unauthorized",
                data: {
                    resetPassword: null,
                },
            };
        }
    };

    // ------------------------- End Reset Password ------------------------- //

};

module.exports = authService;