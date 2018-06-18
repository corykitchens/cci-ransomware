const { Client, Pool } = require('pg');

async function getClient() {
  const pool = new Pool();
  await pool.connect();
  return pool;
}

async function query(text, values) {
  try {
    const client = await getClient();
    const res = await client.query(text, values);
    client.end();
    return res;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getClient: getClient,
  query: query
}