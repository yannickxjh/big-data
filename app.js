const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const database = require('./database')

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
    res.status(200).send(req.body);
})

app.post('/db', (req, res) => {
    var fs = require('fs');
    console.log(req.body.file);
    var text = fs.readFileSync('names/' + req.body.file, 'utf8');
    console.log(text);
    database.add(text, req.body.file);
    res.status(200).send('ok');
})

app.listen(8080, () => {
    console.log('Server listen on port 8080')
})