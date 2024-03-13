// const mongoose = require("mongoose");

// const dropDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await mongoose.connection.dropDatabase();
//     console.log("Database dropped successfully.");
//   } catch (err) {
//     console.error("Error dropping database:", err);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

// module.exports = { dropDatabase };
