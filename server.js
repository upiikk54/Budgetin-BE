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
const transactionController = require("./controllers/transactionController")
const targetController = require("./controllers/targetsController")
const transactionTargetController = require("./controllers/transactionTargetController")

// ------------------- End Import Controller ------------------- //


// ------------------- Import Middlewares ------------------- //

const middlewares = require("./middlewares/auth");

// ------------------- End Import Middlewares ------------------- //


// ------------------- Define Routes Auth ------------------- //

app.post("/auth/register", authController.handleRegister);
app.post("/auth/login", authController.handleLogin);
app.get("/auth/me",middlewares.authenticate, authController.currentUser);
app.put("/auth/forgotpassword", authController.handleForgotPassword);
app.put("/auth/resetpassword", authController.handleResetPassword);

// ------------------- End Define Routes Auth ------------------- //


// ------------------- Define Google Oauth  ------------------- //

app.post("/auth/login-google", authController.handleLoginWithGoogle);

// ------------------- End Define Google Oauth  ------------------- //


// ------------------- Define Routes Users ------------------- //

app.get("/api/users", userController.getAllUsers);
app.get("/api/users/:id", middlewares.authenticate, userController.getUserById);
app.put("/api/users/:id", middlewares.authenticate, upload.single("image"), userController.updateUserById);

// ------------------- Define Routes Users ------------------- //


// ------------------- Define Routes Transaction Income ------------------- //

app.post("/api/transaction/create", middlewares.authenticate, transactionController.createTransactionIncome);
app.put("/api/transaction/update/:id", middlewares.authenticate, transactionController.updateTransactionIncomeById);
app.get("/api/transaction/getAllData", transactionController.getAllTransactionIncome);
app.get("/users/:id/transaction", middlewares.authenticate, userController.getTransactionIncomeByUserId);
app.delete("/api/transaction/delete/:id", middlewares.authenticate, transactionController.deleteTransactionIncomeByUserId);

// ------------------- Define Routes Transaction Income ------------------- //

// ------------------- Define Routes Transaction Outcome ------------------- //

app.post("/api/transactionOutcome/create", middlewares.authenticate, transactionController.createTransactionOutcome);
app.put("/api/transactionOutcome/update/:id", middlewares.authenticate, transactionController.updateTransactionOutcomeById);
app.get("/api/transactionOutcome/getAllData", transactionController.getAllTransactionOutcome);
app.get("/users/:id/transactionOutcome", middlewares.authenticate, userController.getTransactionOutcomeByUserId);
app.delete("/api/transactionOutcome/delete/:id", middlewares.authenticate, transactionController.deleteTransactionOutcomeByUserId);

// ------------------- Define Routes Transaction Outcome ------------------- //

// ------------------- Define Routes Transaction Targets ------------------- //

app.post("/api/targets/create", middlewares.authenticate, upload.single("image"), targetController.createTarget);
app.put("/api/targets/update/:id", middlewares.authenticate, upload.single("image"), targetController.updateTarget);
app.get("/users/:id/targets", middlewares.authenticate, userController.getTargetByUserId);
app.get("/api/target/:id", middlewares.authenticate, targetController.getTargetById);
app.delete("/api/target/delete/:id", middlewares.authenticate, targetController.deleteTarget);

// ------------------- Define Routes Transaction Targets ------------------- //

// ------------------- Define Routes Transaction TransactionTarget ------------------- //

app.post("/api/transactionTarget/create", middlewares.authenticate, transactionTargetController.createTransactionTarget);
app.put("/api/transactionTarget/update/:id", middlewares.authenticate, transactionTargetController.updateTransactionTarget);
app.get("/api/transactionTarget/:id", middlewares.authenticate, transactionTargetController.getTransactionByTargetsId);

// ------------------- Define Routes Transaction TransactionTarget ------------------- //




// ------------------- Listen Server ------------------- //

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`);
});

// ------------------- End Listen Server ------------------- //