const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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

app.listen(8080, () => {
    console.log('Server listen on port 8080')
})