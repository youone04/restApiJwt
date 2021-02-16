require('dotenv').config();
const express = require('express');
const app = express();
const routers = require('./api/users/router');

app.use(express.json());
app.use("/api/users", routers)

app.listen(process.env.PORT_APP , () => {
    console.log('server running on port ' , process.env.PORT_APP);
})

// menit 34