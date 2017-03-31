'use strict'

//initialize global variables
const rp = require('request-promise')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

//define utility functions
const getResource = (resource) => {
  return (req,res) => {
    return res.send(resource)
  }
}

const addResource = (bodyModifierFn) => {
  return (req,res) => {
    const newReqObj = bodyModifierFn(req.body.message)
    return res.status(201).json(newReqObj)
  }
}

const wrangleIncomingData = (message) => {
  return message.split('').reverse().join('').toUpperCase()
}

//initialize routers
app.use(bodyParser.json())
app.get('/', getResource('whassup breh'))
app.post('/post',addResource(wrangleIncomingData))

app.listen(port,() => {
  const serverMessage = `Port is listening at ${port}`
  console.log(serverMessage)
})
