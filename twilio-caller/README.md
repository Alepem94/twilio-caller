# Twilio Web Caller

App para hacer llamadas telefónicas desde el browser usando Twilio.

## Estructura

```
twilio-caller/
├── api/
│   ├── token.js      ← genera token de acceso para el browser SDK
│   └── voice.js      ← TwiML endpoint que procesa la llamada
├── public/
│   └── index.html    ← interfaz del marcador
├── vercel.json
└── package.json
```

## Deploy en Vercel

### 1. Subir a GitHub
Crea un repo en GitHub y sube esta carpeta.

### 2. Importar en Vercel
- Ve a vercel.com → New Project → importa tu repo

### 3. Agregar variables de entorno en Vercel
En Settings → Environment Variables agrega:

| Variable               | Valor                              |
|------------------------|------------------------------------|
| TWILIO_ACCOUNT_SID     | Ca7fe9c80670ebfae61fa16f6a3eadc80  |
| TWILIO_AUTH_TOKEN      | ba1abccb58d71098bb69ff9bf360c806   |
| TWILIO_TWIML_APP_SID   | AP45560d3fc5baa1df7419c7c4b7ba5c15 |
| TWILIO_NUMBER          | +19893421751                       |

### 4. Hacer deploy
Vercel lo desplegará automáticamente. Te dará una URL tipo:
`https://twilio-caller-xxxx.vercel.app`

### 5. Actualizar TwiML App en Twilio
- Ve a Twilio Console → Voice → TwiML Apps → tu app
- Cambia la Voice Request URL a:
  `https://twilio-caller-xxxx.vercel.app/api/voice`
- Guarda

¡Listo! Abre la URL de Vercel y ya puedes hacer llamadas.

## Nota trial de Twilio
En cuenta trial solo puedes llamar a números verificados.
Ve a Twilio Console → Phone Numbers → Verified Caller IDs
para agregar los números a los que quieres llamar.
