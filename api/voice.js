const twilio = require('twilio');

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const to    = req.body?.To || req.query?.To;
  const twiml = new twilio.twiml.VoiceResponse();

  if (to) {
    const dial = twiml.dial({ callerId: process.env.TWILIO_NUMBER });
    dial.number(to);
  } else {
    twiml.say('No se especificó número de destino.');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.send(twiml.toString());
};
