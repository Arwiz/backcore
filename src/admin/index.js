import organizationRouter from './admin-router';
import permissionRouter from './permission-router';
import projectRouter from './project-router';
import teamRouter from './team-router';

export default (app)=> {
    app.use('/api/v1/projects', projectRouter);
    app.use('/api/v1/orgs', organizationRouter);
    app.use('/api/v1/teams', teamRouter);
    app.use('/api/v1/permissions', permissionRouter);
};