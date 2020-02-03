const mongoose = require('mongoose');


module.exports = function () {
    mongoose.connect('mongodb+srv://admin:password12345@biryanibox-vi1r7.gcp.mongodb.net/Chat_application?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.log(err)
            console.error('Could not connect to MongoDB')
        });
}