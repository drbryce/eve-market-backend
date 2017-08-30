var express = require('express')
import { SingleSignOn } from 'eve-singlesignon'
var options = require('../options')
var router = express.Router()

const CLIENT_ID = options.clientId
const SECRET_KEY = options.secretKey
const CALLBACK_URL = options.callBackURL

const sso = new SingleSignOn(CLIENT_ID, SECRET_KEY, CALLBACK_URL)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/login', (req, res, next) => {
  return res.redirect(sso.getRedirectUrl())
})

router.get('/eve_sso_callback', (req, res) => {
  sso.getAccessToken(req.query.code).then(result => {
    // The result contains the access token and expiry time 
    console.log('Access Token:', result.access_token)
    console.log('Expires in:', result.expires_in)
    // Store the access token so you can use it later 

    // Access basic character info 
    return sso.verifyAccessToken(result.access_token)
  })
  .then(result => {
    // We now have some basic info... 
    console.log('Character ID:', result.CharacterID)
    console.log('Character Name:', result.CharacterName)
    res.sendStatus(200)
  })
    .catch(err => {
    // An error occurred 
    })
})

module.exports = router
