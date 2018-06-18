const { Client } = require('pg');

async function getClient() {
  const client = new Client();
  await client.connect();
  return client;
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