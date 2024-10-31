const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { SECRET_JWT_KEY } = require('./config');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/Table');

const app = express();
app.use(express.json());
app.use(cors());


const mongoURI = process.env.MONGO_URI || "mongodb://mongodb:27017/challengedatabase";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password){
                const token = jwt.sign({userId: user._id, email: user.email}, SECRET_JWT_KEY, {expiresIn: '1h'});
                res.status(200).json({token: token});
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'User does not exist' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Server error', error: err });
    });
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {  
                res.status(409).json({ message: 'Email already registered' });
            } else {
                UserModel.create({ email, password })
                    .then(newUser => res.status(201).json(newUser))
                    .catch(err => res.status(500).json({ message: 'Error registering user', error: err }));
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error', error: err });
        });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
