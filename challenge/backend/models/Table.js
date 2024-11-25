const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ //es como una plantilla, la forma que tendran los datos almacenados en la coleccion UserSchema. 
    email: String,
    password: String
})

const UserModel = mongoose.model("user", UserSchema) //crea un modeo basado en el esuema UserSchema, el primer argumento es el nombre de la coleccion en la base de datos.
                                                     //el segundo define como sera el esquema.
module.exports = UserModel