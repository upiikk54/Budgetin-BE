const {
    users
} = require("../models");

class userRepository {
    static async getAllUsers() {
        const getUser = await users.findAll();

        return getUser;
    }

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
    }
}

module.exports = userRepository;