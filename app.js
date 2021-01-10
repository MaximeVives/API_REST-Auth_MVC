const express = require("express")
const bodyParser = require('body-parser')   /*Parse URL*/
const mongoose = require("mongoose")
const middleware = require("./Controllers/Middlewares/loggedMiddleware")

const authRoutes = require("./Routes/routes")
const apiRoutes = require("./Routes/apiRoutes")
const cors = require("cors");

require("dotenv").config()
const app = express()


mongoose.connect(process.env.MONGO, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', middleware.checkLogged, apiRoutes);
/*base de la route puis gestion des différentes routes dans le fichier route.js*/



app.listen(process.env.PORT, ()=>{
    console.log("Started")
})