const User = require('../../src/auth/models/User').default;
const data = [
    {
        isAdmin: true,
        roles: ['admin'],
        firstName: "Arvind",
        lastName: "Rawat",
        email: "arvindrawat111@gmail.com",
        password: "!GiveUp"
    }
];

export default async function seedInitialUsers(force = false, mongoose){
    try {
        if(force){
            await User.deleteMany({});
        }
        const users =  User.find({});
        console.log(users);
        const result =   await User.insertMany(data);
        console.log(result);
    } catch (e) {
        console.error(`Error while creating guideline types: ${e}`);
    }
}