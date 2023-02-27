import User from '../models/User'
import crypto from 'crypto';
import asyncHandler from "../../shared/middleware/asyncHandler";
import encrypt from '../../shared/helpers/encryption.helper'


// @desc  Add New user Function
// @route
// @access

export const CreateUserHandler =  asyncHandler( async ( req, res)=> {
        let { firstName, lastName, email, roles, password } = req.body;
        const  user = {firstName, lastName, email, roles:["Client"] , password};
        const addUserStat = await User.create(user);
        res.status(201).json({success: true, data: addUserStat})
});

// @desc  Add User Handler Function
export const GetAllUsersHandler =  async ( req, res)=> {
    try {
        const results = await User.find({}).select(["-password", "-activeSession"]);
        console.log(results);
        res.status(200).json({success: true, data: results})
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
};

// @desc  Add User Handler Function
// @method Patch

// @desc  Add User Handler Function
export const GetUserByIdHandler = asyncHandler( async ( req, res, next)=> {
        const results = await User.findOne({_id: req.params.id});
        res.status(200).json({status: true , data:  results});
});

export const UpdateUserHandler =  ( req, res, next)=> {
    res.send('Get Users Handler Called');

};

// @desc  Add User Handler Function
// @method delete
export const DeleteUserHandler =  ( req, res, next)=> {
    res.send('Delete User Handler Called');
};


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        // expires: new Date(
        //     Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        // ),
        // httpOnly: true
    };

    // if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    // }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
};