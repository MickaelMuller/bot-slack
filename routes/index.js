const { Router } = require('express');
const request = require('request');

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

module.exports = router;
