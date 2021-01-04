const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'GlazbeniAlbum',
    // password: 'LOZINKA-OVDJE',
    password: 'bazepodataka',
    port: 5432,
});

