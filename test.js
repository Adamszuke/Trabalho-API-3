const Database = require('better-sqlite3');
const db = new Database('filmes.db');

const insert = db.prepare('INSERT INTO filmes (nome, diretor) VALUES (?, ?)');
const listaFilmes = [
    ['Hamnet', 'Chloé Zhao'],
    ['Click', 'Frank Coraci'],
    ['One Piece: Red', 'Goro Taniguchi'],
    ['Hangover Part III', 'Todd Phillips'],
    ['The Hangover', 'Todd Phillips'],
    ['Interstellar', 'Christopher Nolan'],
    ['Eyes Wide Shut', 'Stanley Kubrick'],
    ['The Grinch', 'Ron Howard'],
    ['Scary Movie 2', 'Keenen Ivory Wayans'],
    ['Pinocchio', 'Guillermo del Toro'],
    ['Book of Life', 'Jorge R. Gutierrez'],
    ['Addams Family Values', 'Barry Sonnenfeld'],
    ['Frankenstein', 'Kenneth Branagh'],
    ['Freedom Writers', 'Richard LaGravenese'],
    ['A Real Pain', 'Jesse Eisenberg'],
    ['One Piece Fan Letter', 'Megumi Ishitani'],
    ['Better Man', 'Michael Gracey'],
    ['Lilo & Stitch', 'Chris Sanders'],
    ['A Minecraft Movie', 'Jared Hess'],
    ['I\'m Still Here', 'Walter Salles']
];

const insertMany = db.transaction((dados) => {
    for (const f of dados) insert.run(f[0], f[1]);
});

insertMany(listaFilmes);
console.log("20 filmes inseridos!");

console.log('✅ Tabela filmes criada!');