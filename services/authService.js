const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const {
    passwordResetEmail
} = require("../helper/nodemailer");
const {
    OAuth2Client
} = require("google-auth-library");

const SALT_ROUND = 10;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/;
class authService {

    // ------------------------- Register ------------------------- //
    static async handleRegister({
        userName,
        email,
        password,
        isAgree
    }) {
        try {
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
                    message: "Username harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "username maksimal 15 karakter.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki @",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus memiliki titik(.)",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password minimal 8 karakter.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung huruf besar.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus mengandung angka.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password tidak boleh diberi spasi.",
                    data: {
                        registeredUsers: null,
                    },
                };
            }

            if (!isAgree) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Persetujuan pernyataan data pribadi belum dicentang.",
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
                    message: "Email telah digunakan.",
                    data: {
                        registeredUsers: null,
                    },
                };
            } else {
                const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
                const createdUser = await userRepository.handleRegister({
                    userName,
                    email,
                    password: hashedPassword,
                    isAgree
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Registrasi berhasil.",
                    data: {
                        registeredUsers: createdUser,
                    },
                };
            };
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    registeredUsers: null,
                },
            };
        }
    };
    // ------------------------- End Register ------------------------- //

    // ------------------------- Login ------------------------- //
    static async handleLogin({
        userName,
        password,
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            const passworUppercase = password.match(upperCaseLetters);
            const passworNumbers = password.match(numbers);
            const passwordSpacing = password.match(spacing);

            if (!userName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username harus diisi",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Password harus diisi",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworUppercase) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (!passworNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
                    data: {
                        loginUsers: null,
                    },
                };
            } else if (passwordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Username atau Password salah",
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
                    message: "Username atau Password salah",
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
                        message: "Pengguna berhasil masuk",
                        data: {
                            token,
                        },
                    };
                } else {
                    return {
                        status: true,
                        statusCode: 400,
                        message: "Username atau Password salah",
                        data: {
                            loginUsers: null,
                        },
                    };
                }
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    loginUsers: null,
                },
            };
        }
    };
    // ------------------------- End Login ------------------------- //

    // ------------------------- Forgot Password ------------------------- //
    static async handleForgotPassword({
        email,
        otp
    }) {
        try {
            // ------------------------- Payload Validation ------------------------- //
            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus diisi.",
                    data: {
                        forgot_password: null,
                    },
                };
            }

            const getUser = await userRepository.getUsersByEmail({
                email: email
            });

            if (!getUser) {
                return {
                    status: false,
                    statusCode: 404,
                    message: "Email tidak terdaftar.",
                    data: {
                        forgot_password: null,
                    },
                };
            } else {

                const emailTemplates = {
                    from: 'BudgetInApp',
                    to: email,
                    subject: 'Konfirmasi Reset Password Akun BudgetIn Kamu',
                    html: `  
                        <body 
                        style="
                            background-color: #F1F6F5;
                        "
                        >
                            <section style="padding: 4% 8%;">
                                
                                <div class="content"
                                    style="
                                    margin: 2% 0 0;
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #FFFFFF;
                                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                                    height: auto;"
                                >
                                
                                    <img 
                                        src="https://res.cloudinary.com/dbplhgttm/image/upload/v1670903425/Budgetin-logo_x8ecet.png" 
                                        alt="logo-budgetin"
                                    />

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
                                        background-color: #000;
                                        color: #FFF;
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

                const updatedToken = await userRepository.handleUpdateUserToken({
                    email,
                    otp
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Reset kata sandi dikirim ke email pengguna.",
                    data: {
                        updatedToken
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    forgot_password: null,
                },
            };
        }
    };
    // ------------------------- End Forgot Password ------------------------- //

    // ------------------------- Reset Password ------------------------- //
    static async handleResetPassword({
        otp,
        password
    }) {
        // ------------------------- Payload Validation ------------------------- //
        const passwordUppercase = password.match(upperCaseLetters);
        const passwordNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);

        if (!password) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus diisi.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password minimal 8 karakter.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung huruf besar.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung angka.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Password tidak boleh diberi spasi.",
                data: {
                    resetPassword: null,
                },
            };
        }

        const getUserData = await userRepository.handleGetUserOTP({
            otp,
            password
        });

        if (getUserData.otp == otp) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

            const updateUserPassword = await userRepository.handleResetPassword({
                otp,
                password: hashedPassword
            });

            return {
                status: true,
                statusCode: 201,
                message: "Pengguna berhasil mengubah kata sandi",
                data: {
                    updateUserPassword,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    resetPassword: null,
                },
            };
        }
    };
    // ------------------------- End Reset Password ------------------------- //

    // ------------------------- Auth Login With Google ------------------------- //
    static async handleLoginWithGoogle({
        google_credential: googleCredential
    }) {

        try {

            const client = new OAuth2Client(
                "811794821530-3gp096cooqtmdjmn3d7qg6l2l50rjpq6.apps.googleusercontent.com"
            );

            const userInfo = await client.verifyIdToken({
                idToken: googleCredential,
                audience: "811794821530-3gp096cooqtmdjmn3d7qg6l2l50rjpq6.apps.googleusercontent.com",
            });

            const {
                email,
                userName
            } = userInfo.payload;

            const getUserByEmail = await userRepository.getUsersByEmail({
                email: email
            });

            if (!getUserByEmail) {

                const createdUser = await userRepository.handleRegister({
                    userName,
                    email
                });

                const token = jwt.sign({
                        id: createdUser.id,
                        email: createdUser.email,
                    },
                    JWT.SECRET, {
                        expiresIn: JWT.EXPIRED,
                    });

                return {
                    status: true,
                    status_code: 201,
                    message: "Pengguna berhasil terdaftar!",
                    data: {
                        token,
                        loginGoogle: createdUser,
                    }
                };
            }

        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    loginGoolge: null,
                },
            };
        }

    };
    // ------------------------- End Auth Login With Google ------------------------- //

};

module.exports = authService;