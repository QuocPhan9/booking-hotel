import {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

const checkValidateUserRegister = 
[
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min:6, }),
];

const checkValidateUserLogin = 
[
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min:6, }),
];

const registerUser = async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ messsage: errors.array() });
        return;
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if(user) {
            res.status(400).json({message: "User already exists"});
            return;
        }
        
        user = new User(req.body)
        await user.save();

        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string,{
                expiresIn: "1d"
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        res.sendStatus(200);
        return;
    } catch (error) {
        res.status(500).send({message: "Something went wrong"})
        return;
    }
}

const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() })
        return;
    }

    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email })
        if(!user) {
            res.status(400).json({ message: "Invaild Credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.status(400).json({ message: "Invaild Password" });
            return;
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d"
            }
        );
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000,
        });

        res.status(200).json({ userId: user._id });

    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Something went wrong"})
        return;
    }

}

export {registerUser, loginUser, checkValidateUserRegister, checkValidateUserLogin}