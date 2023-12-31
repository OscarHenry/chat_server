const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex:true
        });
        console.log('DB Online');
    } catch (error) {
        console.error(error);
        throw new Error('Database error');
    }
}

module.exports = {
    dbConnection
}