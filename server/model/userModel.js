import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
    },
    password: {
        type: String,
        select: false, // never return password by default
        // minlength: 6
        //required: true oauth doesn't need password
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // allows null but keeps uniqueness
    },
    avatar: {
        type: String
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function (next) {
    // if password field isn't modifed skip hashing
    if(!this.isModified("password")) {
        return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// match password 
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;