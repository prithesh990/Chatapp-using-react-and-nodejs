const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    message: {
        type: String
    }
});


export const History = mongoose.model('chatapp', messageSchema);