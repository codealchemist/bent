const express = require('express')
const { WebClient } = require('@slack/client')

const app = express()
const port = process.env.PORT || 3000
const token = process.env.SLACK_TOKEN || 'xoxp-142872758064-153754285521-481194793589-2b91d48c194c51b3f78ab7c29a3e43dc'
const slack = new WebClient(token)

app.get('/topic/:topicId', (req, res) => {
  const { topicId } = req.params
  if (!topicId) return console.error('Error: No topic ID.')

  slack.chat
    .postMessage({ text: `Hello there! TOPIC: ${topicId}` })
    .then(res => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts)
    })
    .catch(console.error)
})

app.listen(port)
