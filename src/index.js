const express = require('express')
const request = require('request')
const topics = require('./topics')
const app = express()
const port = process.env.PORT || 3000
const url = process.env.SLACK_URL

app.get('/topic/:topicId', (req, res) => {
  const { topicId } = req.params
  if (!topicId) {
    res.status(500).send('ERROR: No topic specified.')
    return console.error('Error: No topic ID.')
  }

  const topic = topics[topicId]
  if (!topic) {
    res.status(404).send('ERROR: Topic not found.')
    return console.error(`Error: Topic '${topicId}' not found.`)
  }

  const data = {
    text: topic.message
  }
  request.post({ url, json: data }, (err, response, body) => {
    if (err) {
      res.status(500).send(err)
      return console.error('Error:', err)
    }

    res.status(200).send('OK')
    console.log(`SENT ${topicId}:`, topic.message)
  })
})

app.listen(port, () => {
  console.log(`BENT listening on: http://localhost:${port}`)
})
