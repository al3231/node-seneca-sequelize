const express = require("express");
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.get('/api/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    ignoreChars: '0o1il'
    // fontSize: 70
  });
  req.session.captchaText = captcha.text;
  res.send(captcha.data);
});

module.exports = router;