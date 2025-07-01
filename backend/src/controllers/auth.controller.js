import { genToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

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
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isPassCorrect =  await bcrypt.compare(password, user.password)
        if(!isPassCorrect){
            return res.status(400).json({message: "Invalid credentials"})
        }

        genToken(user._id, res)
        res.status(200).json({
            _id:user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        })

    } catch (error) {

        console.log("Error: in log in controller: ", error.message);
        res.status(500).json({message: "Internal server error"});

    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge:0,})
        res.status(200).json({message: "logged out succesfully"})
    } catch (error) {
        console.log("Error: in log out controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userID = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile pic is required"})
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userID, {profilePic: uploadRes.secure_url}, {new:true});

        res.status(200).json(updatedUser);


    } catch (error) {
        console.log("Error: in update profile controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error: in check auth controller: ", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}