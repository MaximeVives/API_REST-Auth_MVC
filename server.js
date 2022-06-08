const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Import des routes
const index_routes = require('./routes/index.js');


// Init api
const app = express();


// Middlewares
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routage
app.use("/index", index_routes);

app.all("*", (req, res) => {
    res.status(501).json({ message: "Pas compris" });
});


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;