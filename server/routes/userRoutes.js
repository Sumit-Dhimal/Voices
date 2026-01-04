import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    checkLoginStatus
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import passport from "passport";
import generateToken from "../utils/generateToken.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', protect, checkLoginStatus);

router.get('/auth/google', 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get('/auth/google/callback', 
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res) => {
        generateToken(res, req.user._id);
        res.redirect("http://localhost:5000/dashboard");
    }
)

export default router;