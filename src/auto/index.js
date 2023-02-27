import autoRouter from './auto-router';
import metaModuleRouter from './meta-module-router';
import ColoumnRouter from './coloumn-router';
import auth from '../auth/middleware/auth';

export default (app)=> {
    app.use('/api/v1/metamodules', auth.protect, metaModuleRouter);
    app.use('/api/v1/auto', auth.protect, autoRouter);
    app.use('/api/v1/coloumn', auth.protect, ColoumnRouter);
};