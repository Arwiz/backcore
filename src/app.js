import express from 'express';
import errorHandler from "./shared/middleware/errorHandler";
import adminRouts from "./admin";
import authRoutes from "./auth";
import autoRoutes from "./auto"
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean';
import logger from 'morgan';

// import createError from 'http-errors'


import cors from 'cors'
const app = new express();
app.use(logger('dev'));
import swaggerInjection from './swagger.injector'

// Body Parser
app.use(express.json());
app.use(cors());

// Remove any keys containing prohibited characters
app.use(mongoSanitize());


// XSS
/* make sure this comes before any routes */
app.use(xss());


// @desc Health Check API
app.get('/', function (req, res) {
    res.send('Health Check Fine')
});

// Set up Auth routes
authRoutes(app);
// Set up Admin routes
adminRouts(app);
// Auto Routes
autoRoutes(app);

// Add Error Middleware
app.use(errorHandler);

// Call swagger configuration
swaggerInjection(app);

export default app;