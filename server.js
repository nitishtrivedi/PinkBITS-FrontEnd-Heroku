const express = require ('express');
const path = require ('path');

const app = express();

//Serve only static files to Heroku from Dist Directory
app.use(express.static('./dist/apps/e-comm-app-user'));

//API
app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/apps/e-comm-app-user/'})
});

//Start the application by listening on default Heroku Port
app.listen(process.env.PORT || 8080);