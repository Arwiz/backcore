require('@babel/register');

const User = require ('../../src/auth/models/User');
const seeder = require('mongoose-seed');
const config = require('../../src/config/config');

// Data array containing seed data - documents organized by Model
const data = [
    {
        'model': 'User',
        'documents': [
            {
                firstName: 'Arvind',
                lastName: 'Rawat',
                isAdmin: true,
                email: 'arvindrawat111@gmail.com',
                roles: ['admin'],
                password: 'arvwind'
            }
        ]
    }
];
// Connect to MongoDB via Mongoose
seeder.connect(config.default.dbConnection, function () {
    // Load Mongoose models
    seeder.loadModels([
        './src/auth/models/User'
    ]);
   console.log(User);
    // Clear specified collections
    seeder.clearModels([User.default], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});
