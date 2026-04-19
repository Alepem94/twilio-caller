const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── PONDRA TUS CREDENCIALES AQUI ───────────────────────────────────────────
const ACCOUNT_SID    = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Tu Account SID
const AUTH_TOKEN     = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';   // Tu Auth Token
const TWIML_APP_SID  = 'APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Tu TwiML App SID (lo creas abajo)
const TWILIO_NUMBER  = '+1xxxxxxxxxx';                       // Tu número Twilio
// ────────────────────────────────────────────────────────────────────────────

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant  = AccessToken.VoiceGrant;

// Genera un token de acceso para el browser SDK
app.get('/token', (req, res) => {
  try {
    const token = new AccessToken(ACCOUNT_SID, AUTH_TOKEN, { identity: 'usuario' });
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: TWIML_APP_SID,
      incomingAllow: false,
    });
    token.addGrant(voiceGrant);
    res.json({ token: token.toJwt() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TwiML endpoint — Twilio llama esto para saber qué hacer con la llamada
app.post('/voice', (req, res) => {
  const to = req.body.To;
  const twiml = new twilio.twiml.VoiceResponse();

  if (to) {
    const dial = twiml.dial({ callerId: TWILIO_NUMBER });
    dial.number(to);
  } else {
    twiml.say('No se especificó número de destino.');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Frontend disponible en http://localhost:${PORT}`);
});
