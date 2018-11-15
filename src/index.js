const express = require('express')
const { RTMClient } = require('@slack/client')

const app = express()
const port = process.env.PORT || 3000
const token = process.env.SLACK_TOKEN || 'xoxp-142872758064-153754285521-480402916945-b8f82adecff5d64e6a4d159f2fd606f8'
const slack = new RTMClient(token)
const channel = process.env.SLACK_CHANNEL || '@bert'

app.get('/topic/:topicId', (req, res) => {
  const { topicId } = req.params
  if (!topicId) return console.error('Error: No topic ID.')

  slack
    .sendMessage(`Hello there! TOPIC: ${topicId}`, channel)
    .then(res => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts)
    })
    .catch(console.error)
})

app.listen(port)
