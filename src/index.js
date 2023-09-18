require('dotenv').config()

const express = require('express')
const VoiceResponse = require('twilio/lib/twiml/VoiceResponse')

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const port = process.env.PORT
const webhookUrl = process.env.WEBHOOK_URL

const client = require('twilio')(accountSid, authToken)

const app = express()

app.all('/', (req, res) => {
  const twiml = new VoiceResponse()

  twiml.say({ voice: 'Google.pt-BR-Standard-A', language: 'pt-br' }, 'Hello, World! Test......')
  res.type('text/xml')
  res.send(twiml.toString())
  
  twiml.redirect({
    method: 'POST'
  }, webhookUrl)
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
