// set up swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.api.json';
export default (application) => {
// Swagger Cofiguration
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: "AutoMaker Sever",
                description: "Auto Maker Sever",
                contact: {
                    name: "Arvind Rawat"
                },
                servers: ['http://localhost:8080']
            }
        },
        apis: ['./src/app.js', './src/admin/controller/*.controller.js']
    };
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    application.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
