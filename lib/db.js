// const {MongoClient} = require('mongodb');
// require('dotenv').config();
// const uri = process.env.DATA_BASE_URL;

// const client = new MongoClient(uri);
// let db = null;

// const connectDB = async () => {
//     try {
//         await client.connect();
//         db=client.db(process.env.DB_NAME);
//         console.log(process.env.DB_NAME);
//         console.log("Database connected successfully");
//     }
//     catch (error) {
//         console.error("Database connection failed", error);
//         throw new Error("Database connection is failed == error");
//     }
// }
// const getDB = async () => {
//     if (!db) {
//         await connectDB();
//     }   
// else{

//     return db;

// }
// }
// module.exports = {getDB, connectDB};

const moongose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try{
        await moongose.connect(process.env.DATA_BASE_URL,{
            dbName: process.env.DB_NAME,
            
        });
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed", error);
        throw new Error("MongoDB connection is failed == error");
    }
}
module.exports = {connectDB};