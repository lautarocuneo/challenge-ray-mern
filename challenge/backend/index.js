const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { SECRET_JWT_KEY } = require('./config'); //me traigo la secret key
const jwt = require('jsonwebtoken'); //importa jsonwebtoken libreria para generar y verificar tokens para autenticacion
const UserModel = require('./models/Table'); //me traigo la data de como seran almacenados los datos en la base de datos

const app = express(); //instancio la aplicacion express
app.use(express.json()); //admite formato json 
app.use(cors()); //permite ue la api acepte solicitudes de otros dominios, comunicacion entre backend y frontend


const mongoURI = process.env.MONGO_URI || "mongodb://mongodb:27017/challengedatabase"; //es la uri por defecto para conectarse a una base de datos mongodb local o contenedor docker

mongoose.connect(mongoURI, { //conecto a la base de datos usando la uri definida arriba
    useNewUrlParser: true, //funcionalidades mongodb
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully'); //conectamos de manera exitosa
}).catch(err => {
    console.error('MongoDB connection error:', err); //hubo error
});


//app.post este codigo se ejecuta cuando recibo una solicitud post en mi puerto 3001 en la ruta /login 
app.post('/login', (req, res) => { //req tiene los datos enviados por el cliente, res es lo que devolvemoss
    const {email, password} = req.body; //me guardo el objeto que me mando el cliente
    UserModel.findOne({email: email}) //busco el mail en la base de datos
    .then(user => {
        if(user) { //si existe el mail
            if(user.password === password){ //si coincide el password que me mando el cliente con el que esta en la base de datos
                const token = jwt.sign({userId: user._id, email: user.email}, SECRET_JWT_KEY, {expiresIn: '1h'}); 
                res.status(200).json({token: token}); //devuelvo lo que corresponda , el token con data. no se crea recurso nuevo
            } else {
                res.status(401).json({ message: 'Incorrect password' }); //si no esta mal la contraseña
            }
        } else {
            res.status(404).json({ message: 'User does not exist' }); //si no encuentro el mail el usuario no existe.
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Server error', error: err }); //caido el server
    });
});

//app.post este codigo se ejecuta cuando recibo una solicitud post en mi puerto 3001 en la ruta /register
app.post('/register', (req, res) => {
    const { email, password } = req.body; //guardo lo que me manda el cliente

    UserModel.findOne({ email: email }) //busco el mail
        .then(user => {
            if (user) {  
                res.status(409).json({ message: 'Email already registered' }); //si lo encuentro, ya esta registrado
            } else {
                UserModel.create({ email, password }) //lo creo en la base de datos
                    .then(newUser => res.status(201).json(newUser)) //si no devuelvo el nuevo usuario y todo ok, se crea recurso nuevo
                    .catch(err => res.status(500).json({ message: 'Error registering user', error: err })); //error falopa
            }
        })
        .catch(err => { //server caido
            res.status(500).json({ message: 'Server error', error: err });
        });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { //con listen empiezo a recibir informacion que va al puerto 3001. (se manda desde login y signup)
  console.log(`Server is running on port ${PORT}`);
});
