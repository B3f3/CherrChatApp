import { genToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const { fullname, username, email, password } = req.body;

    try {
        if(!fullname || !username || !email || !username){
            return res.status(400).json({message: "Fill out all fields please"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const temp = await User.findOne({email})
        if(temp){return res.status(400).json({message: "A user with this email already exists"}); }

        const salt = await bcrypt.genSalt(10);
        const hashdPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashdPass
        });

        if (newUser) {
            //jwt token generated here
            genToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            return res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = (req,res) => {
    res.send("login route")
}

export const logout = (req,res) => {
    res.send("logout route")
}