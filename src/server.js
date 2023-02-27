import app from "./app";
import config from "./config/config"
import createDBConnection from "./config/db";


// Clustering
import cluster from 'cluster'
const numCPUs = require('os').cpus().length;
const dbConnectionStart = createDBConnection();


// Connection To Database
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    //Listen Server
    app.listen(config.port, (data) => {
        console.log(config.port, `server listening in ${config.mode} mode at port ${config.port}`);
    });
}























// Handle unhandled Promise rejection
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error ${err.message}`);
    // server.close(()=>process.exit(1));
});
console.log(`Worker ${process.pid} started`);

export default app;



