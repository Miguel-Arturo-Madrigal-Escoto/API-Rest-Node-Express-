
const mongoose = require('mongoose');

const startConnection = async () => {

    const connUrl = 'mongodb+srv://mikemad:Basket18++@cluster0.wo0j6.mongodb.net/test';

    try {
        
        await mongoose.connect(connUrl);
        console.log('conexion exitosa');

    } catch (error) {
        console.log('error: ', error);
    }

}

module.exports = { startConnection };