import authRouter from './router/auth-router';
import userRouter from './router/user-router';

export default (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
};