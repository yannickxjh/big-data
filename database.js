const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'toto',
        database: 'postgres'
    }
});

knex.schema.hasTable('names').then(exists => {
    if (!exists) {
      return knex.schema.createTable('names', function(t) {
        t.increments('id').primary();
        t.string('name');
        t.string('sex');
        t.integer('number');
        t.integer('year')
      });
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
            knex('names').insert(
                { name: value[0],
                sex: value[1],
                number: Number(value[2]),
                year: year }
            ).then(res => {
                console.log(res)
            })
        }
    });
}


function getNamesBySexYear(mSex, mYear) {
    console.log(mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithStartLetter(mSex, mYear, startLetter) {
    console.log(startLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `${startLetter}%`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithEndLetter(mSex, mYear, endLetter) {
    console.log(endLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `%${endLetter}`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithContainLetter(mSex, mYear, containLetter) {
    console.log(containLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `%${containLetter}%`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithAllLetters(mSex, mYear, startLetter, endLetter, containLetter) {
    console.log(endLetter, startLetter ,containLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `${startLetter}%${containLetter}%${endLetter}`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithStartEndLetters(mSex, mYear, startLetter, endLetter) {
    console.log(endLetter, startLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `${startLetter}%${endLetter}`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithStartContainLetters(mSex, mYear, startLetter, containLetter) {
    console.log(containLetter, startLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `${startLetter}%${containLetter}%`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

function getNamesWithContainEndLetters(mSex, mYear, endLetter, containLetter) {
    console.log(containLetter, endLetter, mSex, mYear);
    knex('names')
        .where({sex: mSex, year: mYear})
        .where('name', 'like', `%${containLetter}%${endLetter}`)
        .orderBy('number', 'desc')
        .limit(10)
        .then(getAll => {
            console.log(getAll)
        })
}

module.exports.knex = knex;
module.exports.add = add;
module.exports.getNamesBySexYear = getNamesBySexYear
module.exports.getNamesWithStartLetter = getNamesWithStartLetter
module.exports.getNamesWithEndLetter = getNamesWithEndLetter
module.exports.getNamesWithContainLetter = getNamesWithContainLetter
module.exports.getNamesWithAllLetters = getNamesWithAllLetters
module.exports.getNamesWithStartEndLetters = getNamesWithStartEndLetters
module.exports.getNamesWithStartContainLetters = getNamesWithStartContainLetters
module.exports.getNamesWithContainEndLetters = getNamesWithContainEndLetters