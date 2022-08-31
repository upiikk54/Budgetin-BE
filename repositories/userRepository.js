const {
    users
} = require("../models");

class userRepository {

    // ------------------------- Get All Users ------------------------- //
    static async getAllUsers() {
        const getUser = await users.findAll();

        return getUser;
    }
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
    }
    // ------------------------- End Get User By Id ------------------------- //


    // ------------------------- Get User By userName ------------------------- //
    static async getUsersByUsername({
        userName
    }) {
        const getUser = await users.findOne({
            where: {
                userName: userName
            }
        });

        return getUser;
    }
    // ------------------------- End Get User By userName ------------------------- //


    // ------------------------- Get User By Email ------------------------- //
    static async getUsersByEmail({
        email
    }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    }
    // ------------------------- End Get User By Email ------------------------- //


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
    }
    // ------------------------- End Register ------------------------- //

    
    // ------------------------- Update User By Id ------------------------- //
    static async updateUserById({
        id,
        dateOfBirth,
        gender,
        image
    }) {
        const updateUserById = await users.update({
            dateOfBirth,
            gender,
            image
        }, {
            where: {
                id
            }
        });

        return updateUserById;
    }
    // ------------------------- End Update User By Id ------------------------- //
}

module.exports = userRepository;