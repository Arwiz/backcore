//@flow
// This will Empty collection first and seed provided data

require('@babel/register');
const mongoose =  require('mongoose');
const config = require('../src/config/config').default;
const seedInitialUsers = require("./seed/masterusers").default;
(async function seed() {
    await mongoose.connect(config.dbConnection,  {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, } );
    try {
        await seedInitialUsers(true, mongoose);
    }catch (e) {
        console.error(`Error while creating while seeding: ${e}`);
    }
    await mongoose.disconnect();
})();