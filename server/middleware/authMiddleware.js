import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

const protect = async(req, res, next) => {
    try {
        let token = req.cookies.jwt;

        if(!token) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');

        next();
    } catch (err) {
        res.status(401);
        next(err);
    }
}

export default protect;