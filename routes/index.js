const { Router } = require('express');
const request = require('request');
const { Client } = require('pg');
const Slack = require('slack')

const client = new Client({
  user: "zosgirralsfyqh",
  password: process.env.passPG,
  database: process.env.dataBaseName,
  port: 5432,
  host: process.env.hostPG,
  ssl: true
});
client.connect();

const router = Router();

router.post('/geekjoke', (req, res) => {
  request('https://geek-jokes.sameerkumar.website/api', (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.json({
        response_type: 'in_channel',
        channel: 'CHSSBBX5F',
        text: "OUPSI c'est cassé",
      });
    }

    return res.json({
      response_type: 'in_channel',
      channel: 'CHSSBBX5F',
      text: `${JSON.parse(body)}`,
    });
  });
});

router.post('/testinsert', (req, res) => {
  client.query('SELECT name from users', (err, results) => {
    if (err) res.sendStatus(500);
    return res.json({
      response_type: 'in_channel',
      channel: 'CHSSBBX5F',
      text: `Les plus beau c'est ${results.rows.map(row => row.name).toString()}`
    })
  });
});

module.exports = router;
