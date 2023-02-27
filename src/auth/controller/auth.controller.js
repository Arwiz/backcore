// @desc  Login Function
import User from "../models/User";
import asyncHandler from "../../shared/middleware/asyncHandler";
import encrypt from "../../shared/helpers/encryption.helper";
import ErrorResponse from "../../shared/utils/ErrorResponse";

export const loginHandler =  asyncHandler( async (req, res, next)=> {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    const user = await User.findOne({ email}).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
});


export const LogOutUserHandler =  asyncHandler( async ( req, res)=> {
      const { email, activeSession} =  req.user;
      if( activeSession.indexOf(req.activeToken) !== -1) {
          const arr =  activeSession.filter(token => token !== req.activeToken );
          const result = await User.updateOne({ email}, {activeSession: arr||[]}).select('+password');
          if (!result) {
              return next(new ErrorResponse('No active session Exist', 401));
          }
          res.status(200).json({success: true, message: "Successfully Logout"})
      }else {
          res.status(200).json({success: true, message: "Invalid Token. Please login again."})
      }
});


// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
    const email =  user.email || [];
    const activeSession =  user.activeSession || [];
    activeSession.push(token);
    const result = await User.updateOne({ email}, {activeSession: activeSession}).select('+password');
    user.password = undefined;
    res
        .status(statusCode)
        .cookie('token', token, { secure: true})
        .json({
            success: true,
            user,
            token
        });
};

