import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionIns = await mongoose.connect(
      "mongodb+srv://sharmagouravdsa:E6k2ZTyxTxlNrWpb@cluster0.4itbg.mongodb.net/fooddel"
    );
    console.log(`DB Connected at ${connectionIns.connection.host}`);
  } catch (error) {
    console.log("MongoDb error", error);
    process.exit(1);
  }
};
export default connectDB;
