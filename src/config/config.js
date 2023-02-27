const config = {
    port: process.env.PORT || 8080,
    mode: process.env.NODE_ENV || 'development',
    dbConnection: process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/xeye_gen_crud',
    secretHashKey: process.env.NODE_ENV || 'iloveindia',
    tokenExpiryTime: process.env.NODE_ENV || '1d'
};
export default config;