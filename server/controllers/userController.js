import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

// @route       POST    /api/users/register
// @access      Public
const registerUser = async(req, res, next) => {
    try { 
        const {username, email, password} = req.body;
        
        // validation
        if(!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        // checking existing user
        const userExists = await User.findOne({email: email});
        if(userExists) {
            res.status(409); // 409 = conflict
            throw new Error("User already exists");
        }
        

        // create user
        const user = await User.create({
            username: username,
            email: email,
            password: password,
        })
        
        // response
        if(user) {
            res.status(201).json({ // 201 = created
                _id: user._id,
                username: user.username,
                email: user.email
            });
        } else {
            res.status(400); // 400 = Bad Request
            throw new Error("Invalid data");
        }
    } catch (err) {
        next(err);
    }
};

// @route       POST    /api/users/login
// @access      Public
const loginUser = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        // validation
        if(!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }


        const user = await User.findOne({email: email});
        if(user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            })
        } else {
            res.status(401); // Unauthorized 
            throw new Error("Invalid email or password")
        }
    } catch (err) {
        next(err);
    }
}


// @route       POST    /api/users/logout
// @access      Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(300).json({
        message: "Logout successfull"
    })
}

export {
    registerUser,
    loginUser,
    logoutUser
}