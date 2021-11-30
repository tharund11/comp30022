import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import passport from 'passport';

import passportfunction from './passportConfig.js';
passportfunction(passport);

export const registerUser = async (req,res) => {
    User.findOne({username: req.body.username}, async (err,doc) => {
        if (err) throw err;
        if (doc) res.send("User already exists!");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User created");
        }
    });

}

export const loginUser = async (req, res, next) => {

    passport.authenticate("local", (err,user,info) => {
       
        if (err) throw err;
        if (!user) res.send("No user exists!");
        else{
            req.login(user, err => {
                if (err) throw err;
                res.send(req.user._id);
                //console.log(req.user);
            })
        }
    })(req, res, next);
}