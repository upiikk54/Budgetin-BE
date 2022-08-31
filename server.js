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


// ------------------- Import Controller ------------------- //

const authController = require("./controllers/authController");
const userController = require("./controllers/userController");

// ------------------- End Import Controller ------------------- //


// ------------------- Import Middlewares ------------------- //

const middlewares = require("./middlewares/auth");

// ------------------- End Import Middlewares ------------------- //


// ------------------- Define Routes Auth ------------------- //

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me",middlewares.authenticate, authController.currentUser);

// ------------------- End Define Routes Auth ------------------- //


// ------------------- Define Routes Users ------------------- //

app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", middlewares.authenticate, userController.getUserById);
app.put("/api/users/:id", middlewares.authenticate, upload.single("image"), userController.updateUserById);

// ------------------- Define Routes Users ------------------- //


// ------------------- Listen Server ------------------- //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});

// ------------------- End Listen Server ------------------- //