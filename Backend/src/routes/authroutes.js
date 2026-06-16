const express   = require("express");
const authController = require("../controller/authcontroller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();
/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
authRouter.post("/register",authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 */
authRouter.post("/login",authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 */
authRouter.post("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user
 */

authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);


module.exports = authRouter;