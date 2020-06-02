const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// Uncomment if mysql is working
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

app.post('/', async (req, res) => {
    let result;
    if (req.body.start == '' && req.body.end == '' && req.body.contain == '') {
        result = await database.getNamesBySexYear(req.body.gender, req.body.year);
    } else if (req.body.start != '' && req.body.end == '' && req.body.contain == '') {
        result = await database.getNamesWithStartLetter(req.body.gender, req.body.year, req.body.start)
    } else if (req.body.end != '' && req.body.start == '' && req.body.contain == '') {
        result = await database.getNamesWithEndLetter(req.body.gender, req.body.year, req.body.end)
    } else if (req.body.contain != '' && req.body.start == '' && req.body.end == '') {
        result = await database.getNamesWithContainLetter(req.body.gender, req.body.year, req.body.contain)
    } else if (req.body.contain != '' && req.body.start != '' && req.body.end != '') {
        result = await database.getNamesWithAllLetters(req.body.gender, req.body.year, req.body.start, req.body.end, req.body.contain)
    } else if (req.body.contain == '' && req.body.start != '' && req.body.end != '') {
        result = await database.getNamesWithStartEndLetters(req.body.gender, req.body.year, req.body.start, req.body.end)
    } else if (req.body.contain != '' && req.body.start != '' && req.body.end == '') {
        result = await database.getNamesWithStartContainLetters(req.body.gender, req.body.year, req.body.start, req.body.contain)
    } else if (req.body.contain != '' && req.body.start == '' && req.body.end != '') {
        result = await database.getNamesWithContainEndLetters(req.body.gender, req.body.year, req.body.end, req.body.contain)
    }
    res.status(200).render('name.html', { data: result })
})

app.post('/db', (req, res) => {
    var fs = require('fs');
    var text = fs.readFileSync('names/' + req.body.file, 'utf8');
    // Uncomment if mysql is working
    database.add(text, req.body.file);
    res.status(200).send('ok');
})

app.listen(8080, () => {
    console.log('Server listen on port 8080')
})