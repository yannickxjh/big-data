const express = require('express')
const app = express()

app.set('views', __dirname)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(8080, () => {
    console.log('Server listen on port 8080')
})