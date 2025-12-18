import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser
} from "../controllers/userController.js"
import passport from "passport";
import generateToken from "../utils/generateToken.js";


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/google', 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get('/google/callback', 
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login",
    }),
    (req, res) => {
        generateToken(res, req.user._id);
        res.redirect("http://localhost:3000");
    }
)

export default router;