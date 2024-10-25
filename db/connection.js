const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://mascots_clinica_user:8AiZmO9PdEzzrQBW79Q1jfAfRLR2BWK1@dpg-csdukk2j1k6c73fpriv0-a.oregon-postgres.render.com/mascots_clinica",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports =  pool;