const {
    users
} = require("../models");

class userRepository {

    // ------------------------- Get All Users ------------------------- //

    static async getAllUsers() {
        const getUser = await users.findAll();

        return getUser;
    };

    // ------------------------- End Get All Users ------------------------- //

    
    // ------------------------- Get User By Id ------------------------- //

    static async getUserById({
        id
    }) {
        const getUser = await users.findOne({
            where: {
                id
            }
        });

        return getUser;
    };

    // ------------------------- End Get User By Id ------------------------- //


    // ------------------------- Get Users By Username ------------------------- //

    static async getUsersByUsername({
        userName
    }) {
        const getUser = await users.findOne({
            where: {
                userName: userName
            }
        });

        return getUser;
    };

    // ------------------------- End Get Users By Username ------------------------- //


    // ------------------------- Get Users By By Email ------------------------- //

    static async getUsersByEmail({
        email
    }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    };

    // ------------------------- End Get Users By By Email ------------------------- //


    // ------------------------- Register ------------------------- //

    static async register({
        userName,
        email,
        password
    }) {
        const registeredUser = users.create({
            userName,
            email,
            password
        });

        return registeredUser;
    };

    // ------------------------- End Register ------------------------- //


    // ------------------------- Update User By Id ------------------------- //

    static async updateUserById({
        id,
        tanggal_lahir,
        jenis_kelamin,
        image
    }) {
        const updateUserById = await users.update({
            tanggal_lahir,
            jenis_kelamin,
            image
        }, {
            where: {
                id
            }
        });

        return updateUserById;
    };

    // ------------------------- End Update User By Id ------------------------- //


    // ------------------------- Update User By Id ------------------------- //

    static async resetPasswordById({
        id,
        password
    }) {
        const resetPasswordById = await users.update({
            password
        }, {
            where: {
                id
            }
        });

        return resetPasswordById;
    };

    // ------------------------- End Update User By Id ------------------------- //

    // ------------------------- Update User Token  ------------------------- //

    static async handleUpdateUserToken({ email, token }){

        const updateToken = await users.update({
            resetPasswordToken: token
        }, {
            where: { email }
        });

        return updateToken;
    };

    // ------------------------- End Update User Token  ------------------------- //
};

module.exports = userRepository;