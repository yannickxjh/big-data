const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'Ton username',
        password: 'Ton mode de passe',
        database: 'la db'
    }
});

knex.select('*').from('names').then(res => {
    console.log(res)
})

function add(data, filename) {
    year = Number(filename.substring(3, 7));
    let datas = data.split('\r\n');
    datas.forEach(element => {
        if (element) {
            value = element.split(',')
            knex('ta table').insert(
                { name: value[0],
                sex: value[1],
                number: Number(value[2]),
                year: year }
            )
        }
    });
}

module.exports.knex = knex;
module.exports.add = add;