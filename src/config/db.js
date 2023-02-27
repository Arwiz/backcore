import mongoose from 'mongoose';
import config from "./config";

const createDBConnection = async () => {
    const connectionStatus = await mongoose.connect(config.dbConnection, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    console.log('Status', connectionStatus.connection.host);
};
export default createDBConnection;
export {mongoose};