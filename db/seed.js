const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'AlbumSong',
    // password: 'LOZINKA-OVDJE',
    password: 'bazepodataka',
    port: 5432,
});

