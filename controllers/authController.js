import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import  jwt from 'jsonwebtoken';

export const register = async (req, res, next) =>{
    try {
        const {full_name, username, email, phone, password, isAdmin, securityQuestion, securityAnswer} = req.body;

        if(!full_name || !username || !email || !phone || !password){
            return next(createError(400, "All fields are required."))
        }

        const existingUser = await User.findOne({username});
        if(existingUser) {
            return next(createError(400, "Username already exists."));
        }

        const existingEmail = await User.findOne({email});
        if(existingEmail) {
            return next(createError(400,"Email already in use."))
        }
        
        const existingPhone = await User.findOne({phone});
        if(existingPhone) {
            return next(createError(400,"Phone number already in use."))
        }
        
        // Hash the password before saving

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        const secureAnsHash = bcrypt.hashSync(securityAnswer, salt);

        const newUser = new User({
            full_name,
            username,
            email,
            phone,
            password: passwordHash,
            securityQuestion,
            securityAnswer: secureAnsHash,
            isAdmin: isAdmin || false
        });
        
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) =>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found!"));
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) 
            return next(createError(400,"Wrong password."));

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT);

        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true, 
        }).status(200).json({details: {...otherDetails}, isAdmin});
    } catch (err) {
        next(err)
    }
}

export const sendSecurityQuestion = async (req, res, next)=>{
    try {
        const {phone} = req.body;
        console.log("Recieved Number: ",phone)
        const user = await User.findOne({phone});
        console.log("User Data: ", user)
        if (!user){
            return res.status(404).json({message:"User not found."})
        }
        res.status(200).json({securityQuestion: user.securityQuestion})
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) =>{
    try {
        const {phone, securityAnswer, newPassword} = req.body;
        const user = await User.findOne({phone});
        if (!user){
            return res.status(404).json({message:"User not found."})
        }
        const isSecurityAnswerCorrect = bcrypt.compareSync(securityAnswer, user.securityAnswer);
        if (!isSecurityAnswerCorrect){
            return res.status(400).json({message:"Invalid Security Answer"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword,salt);
        user.password = hash;
        await user.save();
        res.status(200).json({message:'Password has been updated'})
    } catch (error) {
        next(error)
    }
}