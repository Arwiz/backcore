// Grant access to specific roles
import asyncHandler from "../../shared/middleware/asyncHandler";
import ErrorResponse from "../../shared/utils/ErrorResponse";
import * as jwt from "jsonwebtoken";
import User from '../models/User';
import config from "../../config/config";


exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    //     token = req.headers.authorization.split(' ')[1];
    // }
    token = req.headers.authorization;
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, config.secretHashKey);
        console.log(decoded);
        const  result = await User.findById(decoded.id);
        req.user = result;
        req.activeToken = token;
        next();
    } catch (err) {
        return next(new ErrorResponse('Invalid token', 401));
    }
});