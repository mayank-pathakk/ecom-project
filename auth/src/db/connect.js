import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async (MONGO_URI) => {
    try {
        const data = await mongoose.connect(MONGO_URI, { dbName: "ECOM" });
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }

}

export default connectDB