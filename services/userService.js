const userRepository = require("../repositories/userRepository");
const cloudinary = require("../utils/cloudinary");

class userService {
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
    }

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
    }

    static async updateUserById({
        id,
        tanggal_lahir,
        jenis_kelamin,
        image
    }) {
        const getUserById = await userRepository.getUserById({
            id
        })

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

    }
}

module.exports = userService;