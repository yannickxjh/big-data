const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// Uncomment if mysql is working
//const database = require('./database')

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).render('name.html', { data: req.body.year})
})

app.post('/db', (req, res) => {
    var fs = require('fs');
    var text = fs.readFileSync('names/' + req.body.file, 'utf8');
    // Uncomment if mysql is working
    //database.add(text, req.body.file);
    res.status(200).send('ok');
})

app.listen(8080, () => {
    console.log('Server listen on port 8080')
})