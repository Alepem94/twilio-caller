const twilio = require('twilio');

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant  = AccessToken.VoiceGrant;

module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const identity = 'usuario_' + Math.floor(Math.random() * 10000);

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { identity, ttl: 3600 }
    );

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
      incomingAllow: true,
    });

    token.addGrant(voiceGrant);

    res.json({
      identity,
      token: token.toJwt()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
