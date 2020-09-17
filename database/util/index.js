const { Mongoose } = require("mongoose")

const mongoose = require ('mongoose');

module.exports.connection = async ()=>{
    try {
        await mongoose.connect (process.env.MONGO_DB_URL, {useNewUrlParser:true, useUnifiedTopology:true});
        console.log ('Conectado a la Base de Datos')
    } catch (error){
        throw error;
    }
    

}