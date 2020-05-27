const mongoose = require('mongoose');
const conString = process.env.mongodbconstring;

mongoose.connect(conString, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Connection established with MongoDB');
}).catch(err => {
    console.log('Could not connect to MongoDB. Exiting now...', err);
    process.exit();
});


module.exports = mongoose.connection
