import Audit from './model/audit.schema';

// Audit routes
exports.audit = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(' ')[1];
    }
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const  result = await User.findById(decoded.id);
        req.user = result;
        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route123', 401));
    }
});