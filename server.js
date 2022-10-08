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
const transaction = require("./controllers/transactionController")

// ------------------- End Import Controller ------------------- //


// ------------------- Import Middlewares ------------------- //

const middlewares = require("./middlewares/auth");

// ------------------- End Import Middlewares ------------------- //


// ------------------- Define Routes Auth ------------------- //

app.post("/auth/register", authController.register);
app.post("/auth/login", authController.login);
app.get("/auth/me",middlewares.authenticate, authController.currentUser);
app.put("/auth/forgotpassword", authController.handleForgotPassword);

// ------------------- End Define Routes Auth ------------------- //


// ------------------- Define Routes Users ------------------- //

app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", middlewares.authenticate, userController.getUserById);
app.put("/api/users/:id", middlewares.authenticate, upload.single("image"), userController.updateUserById);
app.put("/api/resetpassword/:id", userController.resetPasswordById);

// ------------------- Define Routes Users ------------------- //


// ------------------- Define Routes Transaction Income ------------------- //

app.post("/api/transaction/create", middlewares.authenticate, transaction.createTransactionIncome);
app.put("/api/transaction/update/:id", middlewares.authenticate, transaction.updateTransactionIncomeById);
app.get("/api/transaction/getAllData", transaction.getAllTransactionIncome);
app.get("/users/:id/transaction", middlewares.authenticate, userController.getTransactionIncomeByUserId);
app.delete("/api/transaction/delete/:id", middlewares.authenticate, transaction.deleteTransactionIncomeByUserId);

// ------------------- Define Routes Transaction Income ------------------- //

// ------------------- Define Routes Transaction Outcome ------------------- //

app.post("/api/transactionOutcome/create", middlewares.authenticate, transaction.createTransactionOutcome);
app.put("/api/transactionOutcome/update/:id", middlewares.authenticate, transaction.updateTransactionOutcomeById);
app.get("/api/transactionOutcome/getAllData", transaction.getAllTransactionOutcome);
app.get("/users/:id/transactionOutcome", middlewares.authenticate, userController.getTransactionOutcomeByUserId);
app.delete("/api/transactionOutcome/delete/:id", middlewares.authenticate, transaction.deleteTransactionOutcomeByUserId);

// ------------------- Listen Server ------------------- //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});

// ------------------- End Listen Server ------------------- //