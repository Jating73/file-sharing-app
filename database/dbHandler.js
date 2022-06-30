const mongoose = require('mongoose');

const userName = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const mongoUrl = `mongodb+srv://${userName}:${password}@cluster0.zyxpl.mongodb.net/file-sharing`;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(mongoUrl, options);

const connection = mongoose.connection;

connection.on("error", () => {
    console.error("Error connecting mongoDB");
});

connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

module.exports = mongoose;