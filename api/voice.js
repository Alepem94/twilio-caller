const twilio = require('twilio');

module.exports = function handler(req, res) {
  const VoiceResponse = twilio.twiml.VoiceResponse;
  const twiml = new VoiceResponse();

  // Twilio envía 'To' en el body cuando se dispara desde el SDK
  const to = (req.body && req.body.To) || (req.query && req.query.To);

  if (to) {
    const dial = twiml.dial({ callerId: process.env.TWILIO_NUMBER });
    // Si es número telefónico (E.164), marca al número; si no, asume cliente
    if (/^[\d+\-\s()]+$/.test(to)) {
      dial.number(to);
    } else {
      dial.client(to);
    }
  } else {
    twiml.say({ language: 'es-MX' }, 'No se especificó número de destino.');
  }

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
};
