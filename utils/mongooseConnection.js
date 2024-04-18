import mongoose from "mongoose"
const mongooseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('database connection successfully !');
    } catch (error) {
        console.log("🚀 ~ file: mongooseConnection.js:7 ~ error:", error);

    }
}

export default mongooseConnection
