const express = require("express");
const app = express();
const PORT = 8901;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/fileUpload");

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// import controller
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");

// import middlewares
const middlewares = require("./middlewares/auth");

// define Routes Auth
app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me",middlewares.authenticate, authController.currentUser);

// define Routes Users
app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", middlewares.authenticate, userController.getUserById);
app.put("/api/users/:id", middlewares.authenticate, upload.single("image"), userController.updateUserById);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});