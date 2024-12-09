import { MongoClient } from "mongodb";

const connectionString =
  "mongodb+srv://ydamtour11:sArL2FWWrnXSydLi@ydamcluster.gljo7.mongodb.net/TourWeb";

const connectDb = async () => {
  const client = new MongoClient(connectionString);

  let connection;

  try {
    connection = await client.connect();
  } catch (error) {
    console.log("failed to connect db");
  }

  const db = connection.db("product");
  return db;
};

export default connectDb;
